<script setup lang="ts">
import { ArrowUpRight, FileUp, LoaderCircle, Radar, Sparkles } from 'lucide-vue-next'
definePageMeta({ layout: 'app' })
const api = useApi(); const router = useRouter()
const { data: assets } = await useAsyncData('inspection-assets', () => api.request<any[]>('/portal/assets').catch(() => []))
const { data: runs, refresh } = await useAsyncData('inspection-runs', () => api.request<any[]>('/portal/inspections').catch(() => []))
const form = reactive({ assetId: '', toolType: 'MFL + Caliper', vendor: 'LineSight Engine', fileName: '', rows: [] as any[] })
const loading = ref(false); const error = ref(''); const drag = ref(false)
const file = ref<File | null>(null); const fileInput = ref<HTMLInputElement | null>(null)
watch(assets, (value) => { if (value?.length && !form.assetId) form.assetId = value[0]._id }, { immediate: true })
function parseCsv(text: string) {
  const lines = text.trim().split(/\r?\n/); const head = lines.shift()?.split(',').map(s => s.trim()) || []
  const idx = (names: string[]) => names.map(n => head.findIndex(h => h.toLowerCase() === n)).find(i => i >= 0) ?? -1
  const distance = idx(['distance_m','distance','distanceM']); const depth = idx(['depth_pct','depth','depthPct']); const length = idx(['length_mm','length','lengthMm']); const width = idx(['width_mm','width','widthMm']); const type = idx(['type','anomaly_type'])
  if (distance < 0 || depth < 0) throw new Error('CSV needs distance_m and depth_pct columns')
  return lines.filter(Boolean).map(line => { const cells = line.split(','); return { distanceM: Number(cells[distance]), depthPct: Number(cells[depth]), lengthMm: length >= 0 ? Number(cells[length]) : 40, widthMm: width >= 0 ? Number(cells[width]) : 20, type: type >= 0 ? cells[type] : 'Metal loss' } })
}
async function readFile(selected?: File) {
  if (!selected) return
  form.fileName = selected.name
  file.value = selected
  try { form.rows = parseCsv(await selected.text()); error.value = '' } catch (e: any) { error.value = e.message }
}
function onDrop(e: DragEvent) { drag.value = false; readFile(e.dataTransfer?.files?.[0]) }
async function run() {
  if (!form.assetId) return
  loading.value = true; error.value = ''
  try {
    let report: any
    if (file.value) {
      const fd = new FormData(); fd.append('file', file.value); fd.append('assetId', form.assetId); fd.append('toolType', form.toolType)
      report = await api.request<any>('/portal/inspections/upload', { method: 'POST', body: fd })
    } else {
      report = await api.request<any>('/portal/inspections', { method: 'POST', body: form })
    }
    await refresh(); router.push(`/app/reports/${report._id}`)
  }
  catch (e: any) { error.value = e?.data?.message || 'Could not run the inspection' }
  finally { loading.value = false }
}
</script>
<template>
  <div>
    <PortalHeader><template #eyebrow>Diagnostic workflow</template><template #title>Run an inspection.</template><template #subtitle>Upload MFL, caliper or CCTV data. The engine screens B31G and returns a ranked report.</template></PortalHeader>
    <div class="grid gap-5 xl:grid-cols-12">
      <div class="xl:col-span-5">
        <div class="rounded-xl border border-ink/12 bg-bone p-5">
          <div class="flex items-center justify-between"><p class="font-display text-[22px]">New run</p><span class="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[.08em] text-mint-deep"><span class="status-dot" /> Engine online</span></div>
          <div class="mt-5 space-y-4"><div><label class="field-label">Asset</label><select v-model="form.assetId" class="field"><option v-for="a in assets" :key="a._id" :value="a._id">{{ a.name }} · {{ a.diameterMm }} mm</option></select></div><div><label class="field-label">Tool / data type</label><select v-model="form.toolType" class="field"><option>MFL + Caliper</option><option>Caliper only</option><option>CCTV + Acoustic</option><option>IMU / mapping</option></select></div></div>
          <div class="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-ink/20 px-4 py-8 text-center transition-colors" :class="drag ? 'border-signal bg-signal/5' : 'hover:border-ink/40'" @click="fileInput?.click()" @dragover.prevent="drag = true" @dragleave.prevent="drag = false" @drop.prevent="onDrop"><FileUp :size="24" class="text-ink/35" /><p class="mt-3 text-[13px] font-medium">{{ form.fileName || 'Drop a CSV or choose a file' }}</p><p class="mt-1 text-[10.5px] text-ink/40">distance_m, depth_pct, length_mm, width_mm · demo accepts any CSV</p><input ref="fileInput" type="file" accept=".csv,text/csv" class="hidden" @change="readFile(($event.target as HTMLInputElement).files?.[0])"></div>
          <p class="mt-3 text-[10.5px] leading-relaxed text-ink/40">No file? Use the demo run — the engine will generate a realistic 18-anomaly dataset for this asset.</p>
          <button class="btn btn-dark mt-4 w-full" :disabled="loading" @click="run"><LoaderCircle v-if="loading" :size="15" class="animate-spin" /> {{ loading ? 'Screening anomalies…' : 'Run diagnostic' }} <Sparkles v-if="!loading" :size="14" /></button>
          <p v-if="error" class="mt-3 text-[11px] text-signal-deep">{{ error }}</p>
        </div>
        <div class="mt-4 rounded-xl border border-ink/12 bg-ink p-5 text-bone"><p class="label-mono text-mint">What happens next</p><ol class="mt-3 space-y-2 text-[11.5px] text-bone/55"><li>1 · Rows are normalised and screened.</li><li>2 · B31G, CGR and remaining life calculated.</li><li>3 · Report saved with a full audit trail.</li></ol></div>
      </div>
      <div class="xl:col-span-7">
        <div class="rounded-xl border border-ink/12 bg-bone">
          <div class="flex items-center justify-between border-b border-ink/10 px-4 py-3"><p class="font-display text-[18px]">Run history</p><span class="font-mono text-[9px] uppercase tracking-[.08em] text-ink/35">{{ runs?.length || 0 }} runs</span></div>
          <div v-if="runs?.length" class="divide-y divide-ink/10"><NuxtLink v-for="r in runs" :key="r._id" :to="r.reportId ? `/app/reports/${r.reportId}` : '/app/inspections'" class="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-4 hover:bg-paper"><span class="flex size-9 items-center justify-center rounded-lg bg-mint/15 text-mint-deep"><Radar :size="15" /></span><div><p class="text-[12.5px] font-medium">{{ r.fileName }}</p><p class="mt-0.5 font-mono text-[9px] uppercase tracking-[.06em] text-ink/35">{{ r.toolType }} · {{ shortDate(r.runDate) }}</p></div><div class="flex items-center gap-2"><StatusPill :status="r.status" /><ArrowUpRight :size="12" class="text-ink/25" /></div></NuxtLink></div>
          <div v-else class="p-8 text-center"><Radar :size="24" class="mx-auto text-ink/20" /><p class="mt-3 text-[13px] text-ink/45">No runs yet. Start the diagnostic on the left.</p></div>
        </div>
        <div class="mt-4 grid grid-cols-3 gap-3"><div class="rounded-xl border border-ink/12 p-4"><p class="font-mono text-[8px] uppercase text-ink/35">Ingestion</p><p class="mt-2 font-display text-[23px]">Any vendor</p></div><div class="rounded-xl border border-ink/12 p-4"><p class="font-mono text-[8px] uppercase text-ink/35">Screening</p><p class="mt-2 font-display text-[23px]">ASME B31G</p></div><div class="rounded-xl border border-ink/12 p-4"><p class="font-mono text-[8px] uppercase text-ink/35">Output</p><p class="mt-2 font-display text-[23px]">Ranked list</p></div></div>
      </div>
    </div>
  </div>
</template>
