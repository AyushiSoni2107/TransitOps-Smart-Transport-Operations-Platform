export async function generateBusinessId(Model, prefix, width = 3) {
  const latest = await Model.findOne({ id: new RegExp(`^${prefix}\\d+$`) })
    .sort({ id: -1 })
    .select('id')
    .lean();

  const latestNumber = latest?.id ? Number.parseInt(latest.id.replace(prefix, ''), 10) : 0;
  return `${prefix}${String(latestNumber + 1).padStart(width, '0')}`;
}
