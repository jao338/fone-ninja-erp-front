import { onMounted, onUnmounted } from 'vue';

import hotkeys from 'hotkeys-js';

import { type HotkeyOptions } from 'src/util/Interface';

export default function useHotkeys(input: HotkeyOptions) {
  const handlers: { [key: string]: (event: KeyboardEvent) => void } = {};

  const hotkeyList = Array.isArray(input) ? input : [input];

  onMounted(() => {
    hotkeyList.forEach(({ keys, callback, preventDefault = true }) => {
      const keyList = Array.isArray(keys) ? keys : [keys];

      keyList.forEach(k => {
        const handler = (event: KeyboardEvent) => {
          if (preventDefault) event.preventDefault();
          callback(event);
        };
        handlers[k] = handler;
        hotkeys(k, handler);
      });
    });
  });

  onUnmounted(() => {
    Object.entries(handlers).forEach(([k, handler]) => {
      hotkeys.unbind(k, handler);
    });
  });
}
