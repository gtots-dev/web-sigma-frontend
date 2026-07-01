import { useEffect, useRef } from 'react'

export function useWebSocketSubscription<T>(
  subscribeFn: (callback: (data: T) => void) => () => void,
  onData: (data: T) => void
) {
  const savedCallback = useRef(onData)

  useEffect(() => {
    savedCallback.current = onData
  }, [onData])

  useEffect(() => {
    return subscribeFn((data) => savedCallback.current(data))
  }, [subscribeFn])
}
