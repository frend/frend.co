'use strict'

import { q } from 'frend-utils'

export default function FrInitial ({
    selector: selector = '',
    readyClass: readyClass = ''
  } = {}) {

  // aliases
  const doc = document
  const docEl = doc.documentElement

  // supports
  if (
    !('querySelector' in doc) ||
    !('addEventListener' in window) ||
    !docEl.classList
  ) return

  // element
  const el = q(selector)

  // public functions
  function destroy () {
    el.classList.remove(readyClass)
  }
  function init () {
    if (!el.length) return
    el.classList.add(readyClass)
  }
  init()

  // expose public functions
  return { init, destroy }
}
