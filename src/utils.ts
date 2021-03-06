import gm, { State, Dimensions, GetterOptions } from "gm";
import request from "request-promise-native";
import { promisify } from "util";

export async function getImage(url: string): Promise<State> {
  return gm(await request(url, { encoding: null }));
}

export function getImageSize(image: State): Promise<Dimensions> {
  return promisify<GetterOptions, Dimensions>(image.size)({
    bufferStream: true
  });
}

export async function saveImage(image: State): Promise<string> {
  return (await promisify<string, Buffer>(image.toBuffer.bind(image))(
    "PNG"
  )).toString("base64");
}
