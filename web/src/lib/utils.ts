export function calculateMargin(cost: number, selling: number) {
    if (!cost || !selling) return 0;
  
    const margin = ((selling - cost) / selling) * 100;
    return Number(margin.toFixed(2));
  }