# Web Application.
This is the Frontend part of the assignment.

## Getting Started

The frontend part runs on custom port 8080.

To run the application, first install the dependencies by:

```bash
npm install
# or
yarn install
```
Then, build the application.

```bash
npm run build
# or
yarn build
```

To start the server, run

```bash
npm start
# or
yarn start
```

NOTE: The backend service must run before starting the frontend.

## Frameworks

### Application framework
The frontend is using NextJS / ReactJS with server side rendering. 

The Places data are rendered on the client side (browsers), since in real-life 
application these kind of data are usually dynamic. 

The data is fetched using [SWR React Hook](https://swr.vercel.app/), with a simple REST API.

As it is only a simple a application, no State Management library is needed.

### UI Framework
The application uses [Mantine React component library](https://mantine.dev/). It has built-in,
customisable, easy-to-use and flexible configuration systems.

## References
Built from scratch by referencing to:
- NextJS "Getting started" and documentation
- Mantine component library documentation

I have both of these in my previous work, 100% with Typescript and GraphQL (Apollo client), and .

Estimated time taken: ~2 Hours including time for reading the latest updates.
