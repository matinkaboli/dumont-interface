FROM node:20.12.2-slim

COPY package.json package-lock.json /app/
WORKDIR /app

RUN npm ci

COPY . /app

RUN rm .eslintrc.json
RUN npm run build

# ARG NEXT_PUBLIC_ALCHEMY_ID
# ARG NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
# ARG NEXT_PUBLIC_API_URL
# RUN touch .env.production
# RUN echo "NEXT_PUBLIC_ALCHEMY_ID=${NEXT_PUBLIC_ALCHEMY_ID}" >> .env.production
# RUN echo "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=${NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}" >> .env.production
# RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" >> .env.production

ENV NEXT_PUBLIC_RPC=https://base-sepolia.g.alchemy.com/v2/LBDHxVVsJL8N_1-AY0oAzZnhJV_EUpxd
ENV NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=cccdc043c8bc8a9d9cf71d4fcafe60f0
ENV NEXT_PUBLIC_API_URL=https://api.dumont.gg

# RUN touch .env.production
#
# RUN NEXT_PUBLIC_RPC=https://base-sepolia.g.alchemy.com/v2/LBDHxVVsJL8N_1-AY0oAzZnhJV_EUpxd >> .env.production
# RUN NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=cccdc043c8bc8a9d9cf71d4fcafe60f0 >> .env.production
# RUN NEXT_PUBLIC_API_URL=https://api.dumont.gg >> .env.production

CMD ["npm", "run", "start"]
