async function fetcher(url:string, option = {}) {
    let response;    
    response = await fetch(url, option);
    const data = await response.json();
    return data;
}
export default fetcher;