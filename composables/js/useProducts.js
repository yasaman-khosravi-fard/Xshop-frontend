export const useProducts = async (type = 'new') => {
    const { data } = await useFetch(`/api/products?sort=${type}`)
    return data.value || []
}