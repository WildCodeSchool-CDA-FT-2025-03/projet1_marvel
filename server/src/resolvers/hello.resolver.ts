import { Hello } from '../entities/hello.entities';

export const getHello = async () => {
  const hello = await Hello.find();
  return hello;
};

export const getHelloById = async (_: unknown, { id }: { id: number }) => {
  const hello = await Hello.findOne({ where: { id } });
  return hello;
};

export const createHello = async (_: unknown, { message }: { message: string }) => {
  const hello = new Hello();
  hello.message = message;
  await hello.save();
  return hello;
};
