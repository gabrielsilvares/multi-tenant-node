import { Search } from "sonic-channel"

export class Sonic {
  async searchMethod() {
    const sonicChannelSearch = new Search({
      host: 'localhost',
      port: 1491,
      auth: 'SecretPassword'
    })
  
    sonicChannelSearch.connect({
      connected: () => {
        console.log('Conectou')
      }
    })
  
    return sonicChannelSearch
  }
}