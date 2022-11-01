import Fastify from "fastify";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    });

    fastify.get('/pools/count', () => {
        return { count: 123 };
    });

    fastify.listen({ port: 3000 });
};

bootstrap();
