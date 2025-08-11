import { create } from 'zustand'

interface Binding {
  perm_profile_id: number
  contract_id: number[]
}

interface CacheSelectedBindsState {
  bindings: Binding[]
  permProfilesSelected: { id: number } | null

  setSelectedPermProfile: (profile: { id: number }) => void
  toggleContractForSelectedProfile: (contract_id: number) => void
  clearBindings: () => void
  getSelectedProfileWithContracts: () => {
    perm_profile_id: number
    contract_id: number[]
  } | null
}

export const useCacheSelectedBindsStore = create<CacheSelectedBindsState>(
  (set, get) => ({
    bindings: [],
    permProfilesSelected: null,

    setSelectedPermProfile: (profile) => {
      const current = get().bindings
      const alreadyExists = current.some(
        (b) => b.perm_profile_id === profile.id
      )

      const updatedBindings = alreadyExists
        ? current
        : [...current, { perm_profile_id: profile.id, contract_id: [] }]

      set({
        permProfilesSelected: profile,
        bindings: updatedBindings
      })
    },

    toggleContractForSelectedProfile: (contract_id) => {
      const selected = get().permProfilesSelected
      if (!selected) return

      const current = get().bindings
      const existing = current.find((b) => b.perm_profile_id === selected.id)

      if (existing) {
        const contractExists = existing.contract_id.includes(contract_id)

        const updatedContracts = contractExists
          ? existing.contract_id.filter((id) => id !== contract_id)
          : [...existing.contract_id, contract_id]

        set({
          bindings: current.map((b) =>
            b.perm_profile_id === selected.id
              ? { ...b, contract_id: updatedContracts }
              : b
          )
        })
      } else {
        set({
          bindings: [
            ...current,
            { perm_profile_id: selected.id, contract_id: [contract_id] }
          ]
        })
      }
    },

    clearBindings: () => set({ bindings: [], permProfilesSelected: null }),

    getSelectedProfileWithContracts: () => {
      const selected = get().permProfilesSelected
      if (!selected) return null
      const binding = get().bindings.find(
        (b) => b.perm_profile_id === selected.id
      )
      return {
        perm_profile_id: selected.id,
        contract_id: binding?.contract_id ?? []
      }
    }
  })
)
