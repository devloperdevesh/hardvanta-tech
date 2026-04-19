export function getRecommendations(products: any[], current: any) {
    return products
      .filter(
        (p) =>
          p.category === current.category &&
          p.id !== current.id
      )
      .slice(0, 4);
  }