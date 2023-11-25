/* eslint-disable no-console */
import { useEffect, useState } from "react"
import pino from "pino"
// hooks
import useToastMessage, { ToastMessage } from "./useToastMessage"

const logger = pino()

export enum IndexedDBStore {
  CurrActiveSesh = "current-active-session",
}

export default function useCurrActiveSeshIndexDb() {
  const toastMsg = useToastMessage()

  const [db, setDb] = useState<IDBDatabase | null>(null)
  const VERSION = 1

  const clearDb = (storeName: IndexedDBStore) => {
    if (!db) {
      logger.error("DB not initialized")
      return
    }
    try {
      logger.info(`Clearing ${storeName}`)
      const tx = db?.transaction(storeName, "readwrite")
      const store = tx?.objectStore(storeName)
      store?.clear()
    } catch (error) {
      logger.error(error)
      toastMsg("Error clearing database.", ToastMessage.Error)
    }
  }

  const getAllFromDb = (storeName: IndexedDBStore) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        logger.error("DB not initialized")
        return
      }
      try {
        logger.info("Begin transaction...")
        const tx = db.transaction(storeName, "readonly")
        const store = tx.objectStore(storeName)
        const response = store.getAll()
        response.onsuccess = () => {
          logger.info("Successful transaction")
          resolve(response.result)
        }
      } catch (error) {
        logger.error(error)
        toastMsg("Error grabbing data.", ToastMessage.Error)
        reject(error)
      }
    })
  }

  // upsert
  const addToDb = (storeName: IndexedDBStore, data: unknown) => {
    if (!db) {
      logger.error("DB not initialized")
      return
    }
    try {
      logger.info("Begin transaction...")
      const tx = db.transaction(storeName, "readwrite")
      const store = tx.objectStore(storeName)
      store.put(data)
      logger.info("Successful transaction")
    } catch (error) {
      logger.error(error)
      toastMsg("Error updating set.", ToastMessage.Error)
    }
  }

  const deleteFromDb = (storeName: IndexedDBStore, key: string) => {
    if (!db) {
      logger.error("DB not initialized")
      return
    }
    try {
      logger.info("Begin transaction...")
      const tx = db.transaction(storeName, "readwrite")
      const store = tx.objectStore(storeName)
      store.delete(key)
      logger.info("Successful transaction")
    } catch (error) {
      logger.error(error)
      toastMsg("Error updating set.", ToastMessage.Error)
    }
  }

  // init DB
  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      logger.info("Initializing DB")
      const request = indexedDB.open("current-active-session", VERSION)

      request.onupgradeneeded = () => {
        const db = request.result
        logger.info("Upgrade Needed")
        if (!db.objectStoreNames.contains(IndexedDBStore.CurrActiveSesh)) {
          logger.info(
            `${IndexedDBStore.CurrActiveSesh} store does not exist. Creating...`
          )
          db.createObjectStore(IndexedDBStore.CurrActiveSesh, {
            keyPath: "frontendSetId",
          })
        }
      }

      request.onsuccess = () => {
        const db = request.result
        const version = db.version
        logger.info("request.onsuccess - initDB", version)

        setDb(db)
      }
    })()
  }, [])

  return { addToDb, deleteFromDb, getAllFromDb, clearDb }
}
