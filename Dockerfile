FROM node:20.12.2-slim

COPY package.json package-lock.json /app/
WORKDIR /app

RUN npm i

COPY . /app

RUN rm .eslintrc.json

ENV NEXT_PUBLIC_RPC=https://base-sepolia.g.alchemy.com/v2/LBDHxVVsJL8N_1-AY0oAzZnhJV_EUpxd
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=cccdc043c8bc8a9d9cf71d4fcafe60f0
ENV NEXT_PUBLIC_NETWORK=baseSepolia
ENV NEXT_PUBLIC_API_URL=https://api.dumont.gg
ENV NEXT_PUBLIC_PRIVY_APP_ID=cm3v7l7mg05lz1zguivw56abcd
ENV NEXT_PUBLIC_HOTJAR_ID=ABCD

RUN npm run build

CMD ["npm", "run", "start"]
