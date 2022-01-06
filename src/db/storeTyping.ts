import { TypingInterface } from "src/schema/typing/typing.interface";
import { writable } from "svelte/store";

const storeTypings = () => {
  const { subscribe, update, set } = writable([]);
  return {
    subscribe,
    init: (typings: TypingInterface[]) => {
      set(typings);
    },
    createRole: (typing: TypingInterface) => {
      update(n => {
        return n.concat([typing]);
      });
      return {
        create: true,
        typing,
      };
    },

    setCard: (typing: TypingInterface) =>
      update(n => {
        const index = n.findIndex(c => c.id == typing.id);
        n[index] = typing;
        return n;
      }),

    removeCard: (id: string) =>
      update(n => {
        return n.filter(n => n.id !== id);
      }),
  };
};

export const typings = storeTypings();
