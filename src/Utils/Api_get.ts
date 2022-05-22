export function get(url: RequestInfo){
    return fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjg1NjEzYTE5YzU4ZmM2ZjI1YzNmNGNjNTNlODNjMSIsInN1YiI6IjYyMjY1MWUyODdhZTdiMDA3MTZkMjc5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.41LohuFxmvuoCvCtWBo4wMLwljO8XXJhxAYlBlDMC3w",
          "Content-Type": "application/json;charset=utf-8",
      },
    }).then((result) => result.json())
}