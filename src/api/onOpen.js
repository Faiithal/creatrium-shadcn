import { store as storeHistory } from '../api/history'
import { show as checkUser } from '../api/profile'
import { checkLike } from '../api/likes'
import { checkFavorite } from '../api/favorites'
import { show } from './projects'

export const onOpen = (viewId, setViewData, setUserData, setLikeData, setFavoriteData, setLoading) => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzNkMDM4OTliYzZiZWY0MzE3Y2I4YTE2MjQwZDUwNTQwNWNkNDY2MzgxMzIxNjE2MWZjZDI0OTdjMWJlMzRmZmEwODBmOWJlMjgwMzNjMTUiLCJpYXQiOjE3MzkzNDA4MTYuNzI1OTIzLCJuYmYiOjE3MzkzNDA4MTYuNzI1OTI2LCJleHAiOjE3NzA4NzY4MTYuNTE3ODc2LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.HyoYdODpyzKXclRxDdcrwEdbrVuFHQI4PMFWGtOD9wD_0ywKABH-mJcOvPC_tb0xrg8GOSV3TxgddP1Vx7OXJ7fHoAo4zTv1NGr0zVgRclbUactDI31Q8JEbu5CEzP9Y_PpgG5EDfIy9RqY9HgRxWvuoo2tU1G0H_j-FqhiEThqJFILm2HMFPcFX8jmQfugBCfXgF5o4oOKyCNs7s8sqchO-_neLGkdunPbyGoM8sY6nWQpOOLZYAHL8JDrb_RT0prpgcZipZZUD0MH9Vm_RchzDtbgkkPrPpbH-pTQOrcI0fiwlJf_hYdW2IN6zzPMlFOUSakyCpEFf3ICRYfGx-H1kVMXn7sV57-KkZnCg4tYbTYuBOPsq8RYrYpZruxGQRF0eK6QfsYaECiO2hEyjBEkb0cxmcw4ryfdoWVXez1zoi4FUQ201dW6Dha4J4DMeLL0UE1ZLQy81mmTHJkFXRkb0HtzPnO1CzSyG3AUjZluG1MQFEQfEy0wS481YIOp-GMcy8700OHuzyDybwSwooYdCyD-7s7pydbqkG04ayo9g_CJnq9TGD8osBF8VFrzdg0IgdY3lPXZwBjtpZFbnUgu3RLrjgn94yK2I_Lsa8IDV6_VTWH-uPPtska7Rxc9OB0sRk-UpPOm7RzJhWjMpXcRUt7re4OzmvLT-b_tq9fE'
    setLoading(true)
    if (viewId) {
      show(viewId).then((res) => {
        console.log(res)
        setViewData(res.data)
        storeHistory(res.data.id, token)
        // Checks Like

        checkUser(res.data.user_id).then((res) => {
          console.log(res)
          setUserData(res.data)
        })

        checkLike(res?.data.id, token).then((res) => {
          console.log(res)
          if (res?.ok) {
            setLikeData(res?.data)
          }
        }
        )

        checkFavorite(res?.data.id, token).then((res) => {
          console.log(res)
          if (res?.ok) {
            setFavoriteData(res?.data)
          }
        }
        ).finally(() => {

          setLoading(false)
        })

      }
      )
    }

  }
