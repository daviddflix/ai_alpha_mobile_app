const calendarCryptos = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    image_32: 'https://coindar.org/images/coins/bitcoin/32x32.png',
    image_64: 'https://coindar.org/images/coins/bitcoin/64x64.png',
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    image_32: 'https://coindar.org/images/coins/ethereum/32x32.png',
    image_64: 'https://coindar.org/images/coins/ethereum/64x64.png',
  },
  {
    id: '2609',
    name: 'Cosmos',
    symbol: 'ATOM',
    image_32: 'https://coindar.org/images/coins/cosmos/32x32.png',
    image_64: 'https://coindar.org/images/coins/cosmos/64x64.png',
  },
  {
    id: '8667',
    name: 'Polkadot',
    symbol: 'DOT',
    image_32: 'https://coindar.org/images/coins/polkadot/32x32.png',
    image_64: 'https://coindar.org/images/coins/polkadot/64x64.png',
  },
  {
    id: '1956',
    name: 'Quant',
    symbol: 'QNT',
    image_32: 'https://coindar.org/images/coins/quant/32x32.png',
    image_64: 'https://coindar.org/images/coins/quant/64x64.png',
  },
  {
    id: '15',
    name: 'Cardano',
    symbol: 'ADA',
    image_32: 'https://coindar.org/images/coins/cardano/32x32.png',
    image_64: 'https://coindar.org/images/coins/cardano/64x64.png',
  },
  {
    id: '7670',
    name: 'Solana',
    symbol: 'SOL',
    image_32: 'https://coindar.org/images/coins/solana/32x32.png',
    image_64: 'https://coindar.org/images/coins/solana/64x64.png',
  },
  {
    id: '9393',
    name: 'Avalanche',
    symbol: 'AVAX',
    image_32: 'https://coindar.org/images/coins/avalanche/32x32.png',
    image_64: 'https://coindar.org/images/coins/avalanche/64x64.png',
  },
  {
    id: '9470',
    name: 'Near',
    symbol: 'NEAR',
    image_32: 'https://coindar.org/images/coins/near/32x32.png',
    image_64: 'https://coindar.org/images/coins/near/64x64.png',
  },
  {
    id: '2340',
    name: 'Fantom',
    symbol: 'FTM',
    image_32: 'https://coindar.org/images/coins/fantom/32x32.png',
    image_64: 'https://coindar.org/images/coins/fantom/64x64.png',
  },
  {
    id: '22648',
    name: 'Kaspa',
    symbol: 'KAS',
    image_32: 'https://coindar.org/images/coins/kaspa/32x32.png',
    image_64: 'https://coindar.org/images/coins/kaspa/64x64.png',
  },
  {
    id: '32',
    name: 'Stellar',
    symbol: 'XLM',
    image_32: 'https://coindar.org/images/coins/stellar/32x32.png',
    image_64: 'https://coindar.org/images/coins/stellar/64x64.png',
  },
  {
    id: '2871',
    name: 'Algorand',
    symbol: 'ALGO',
    image_32: 'https://coindar.org/images/coins/algorand/32x32.png',
    image_64: 'https://coindar.org/images/coins/algorand/64x64.png',
  },
  {
    id: '3205',
    name: 'XRP',
    symbol: 'XRP',
    image_32: 'https://coindar.org/images/coins/xrp/32x32.png',
    image_64: 'https://coindar.org/images/coins/xrp/64x64.png',
  },
  {
    id: '10415',
    name: 'Lido DAO',
    symbol: 'LDO',
    image_32: 'https://coindar.org/images/coins/lido-dao/32x32.png',
    image_64: 'https://coindar.org/images/coins/lido-dao/64x64.png',
  },
  {
    id: '1751',
    name: 'Rocket Pool',
    symbol: 'RPL',
    image_32: 'https://coindar.org/images/coins/rocket-pool/32x32.png',
    image_64: 'https://coindar.org/images/coins/rocket-pool/64x64.png',
  },
  {
    id: '10270',
    name: 'Frax Share',
    symbol: 'FXS',
    image_32: 'https://coindar.org/images/coins/frax-share/32x32.png',
    image_64: 'https://coindar.org/images/coins/frax-share/64x64.png',
  },
  {
    id: '2721',
    name: 'Polygon',
    symbol: 'MATIC',
    image_32: 'https://coindar.org/images/coins/matic-network/32x32.png',
    image_64: 'https://coindar.org/images/coins/matic-network/64x64.png',
  },
  {
    id: '26447',
    name: 'Arbitrum',
    symbol: 'ARB',
    image_32: 'https://coindar.org/images/coins/arbitrum/32x32.png',
    image_64: 'https://coindar.org/images/coins/arbitrum/64x64.png',
  },
  {
    id: '22166',
    name: 'Optimism',
    symbol: 'OP',
    image_32: 'https://coindar.org/images/coins/optimism/32x32.png',
    image_64: 'https://coindar.org/images/coins/optimism/64x64.png',
  },
  {
    id: '52',
    name: 'Chainlink',
    symbol: 'LINK',
    image_32: 'https://coindar.org/images/coins/chainlink/32x32.png',
    image_64: 'https://coindar.org/images/coins/chainlink/64x64.png',
  },
  {
    id: '10102',
    name: 'API3',
    symbol: 'API3',
    image_32: 'https://coindar.org/images/coins/api3/32x32.png',
    image_64: 'https://coindar.org/images/coins/api3/64x64.png',
  },
  {
    id: '3070',
    name: 'Band Protocol',
    symbol: 'BAND',
    image_32: 'https://coindar.org/images/coins/band-protocol/32x32.png',
    image_64: 'https://coindar.org/images/coins/band-protocol/64x64.png',
  },
  {
    id: '15096',
    name: 'dYdX',
    symbol: 'ETHDYDX',
    image_32: 'https://coindar.org/images/coins/dydx/32x32.png',
    image_64: 'https://coindar.org/images/coins/dydx/64x64.png',
  },
  {
    id: '15173',
    name: 'GMX',
    symbol: 'GMX',
    image_32: 'https://coindar.org/images/coins/gmx/32x32.png',
    image_64: 'https://coindar.org/images/coins/gmx/64x64.png',
  },
  {
    id: '9372',
    name: 'Velo',
    symbol: 'VELO',
    image_32: 'https://coindar.org/images/coins/velo/32x32.png',
    image_64: 'https://coindar.org/images/coins/velo/64x64.png',
  },
  {
    id: '9336',
    name: 'Uniswap',
    symbol: 'UNI',
    image_32: 'https://coindar.org/images/coins/uniswap/32x32.png',
    image_64: 'https://coindar.org/images/coins/uniswap/64x64.png',
  },
  {
    id: '19907',
    name: 'Sushi (Wormhole)',
    symbol: 'SUSHI',
    image_32: 'https://coindar.org/images/coins/sushi-wormhole/32x32.png',
    image_64: 'https://coindar.org/images/coins/sushi-wormhole/64x64.png',
  },
  {
    id: '9465',
    name: 'PancakeSwap',
    symbol: 'CAKE',
    image_32: 'https://coindar.org/images/coins/pancakeswap/32x32.png',
    image_64: 'https://coindar.org/images/coins/pancakeswap/64x64.png',
  },
  {
    id: '9531',
    name: 'Aave',
    symbol: 'AAVE',
    image_32: 'https://coindar.org/images/coins/aave-new/32x32.png',
    image_64: 'https://coindar.org/images/coins/aave-new/64x64.png',
  },
  {
    id: '11908',
    name: 'Pendle',
    symbol: 'PENDLE',
    image_32: 'https://coindar.org/images/coins/pendle/32x32.png',
    image_64: 'https://coindar.org/images/coins/pendle/64x64.png',
  },
  {
    id: '10318',
    name: '1inch',
    symbol: '1INCH',
    image_32: 'https://coindar.org/images/coins/1inch/32x32.png',
    image_64: 'https://coindar.org/images/coins/1inch/64x64.png',
  },
  {
    id: '2743',
    name: 'Ocean Protocol',
    symbol: 'OCEAN',
    image_32: 'https://coindar.org/images/coins/ocean-protocol/32x32.png',
    image_64: 'https://coindar.org/images/coins/ocean-protocol/64x64.png',
  },
  {
    id: '2586',
    name: 'Fetch.ai',
    symbol: 'FET',
    image_32: 'https://coindar.org/images/coins/fetch/32x32.png',
    image_64: 'https://coindar.org/images/coins/fetch/64x64.png',
  },
  {
    id: '8398',
    name: 'Render Token',
    symbol: 'RNDR',
    image_32: 'https://coindar.org/images/coins/render-token/32x32.png',
    image_64: 'https://coindar.org/images/coins/render-token/64x64.png',
  },
];

export default calendarCryptos;