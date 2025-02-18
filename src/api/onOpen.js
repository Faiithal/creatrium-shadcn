import { store as storeHistory } from '../api/history'
import { show as checkUser } from '../api/profile'
import { checkLike } from '../api/likes'
import { checkFavorite } from '../api/favorites'
import { show } from './projects'

export const onOpen = (viewId, setViewData, setUserData, setLikeData, setFavoriteData, setLoading, tokenCookie) => {
    const token = tokenCookie
    setLoading(true)
    if (viewId) {
      show(viewId).then((res) => {
        setViewData(res.data)
        storeHistory(res.data.id, token)
        // Checks Like

        checkUser(res.data.user_id).then((res) => {
          setUserData(res.data)
        })

        checkLike(res?.data.id, token).then((res) => {
          if (res?.ok) {
            setLikeData(res?.data)
          }
        }
        )

        checkFavorite(res?.data.id, token).then((res) => {
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
