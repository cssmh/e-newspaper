import { useState } from 'react'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import useAuth from '../../hooks/useAuth'
import EditModal from './EditModal'

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth()
  const { photoURL, email, displayName } = user
  console.log(user)

  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }
  const [dp, setDp] = useState(photoURL)
  const [name, setName] = useState(displayName)

  const handleUpdate = (e) => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const photo = form.photo.value
    updateUserProfile(name, photo)
      .then(() => {
        setDp(photo)
        setName(name)
      })
      .catch((err) => toast.error(err.message))
  }

  return (
    <div>
      <Helmet>
        <title>E-Newspaper | My Profile</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center h-[76vh] md:gap-5">
        <div className="w-1/2">
          <img src={dp} className="rounded-lg lg:w-60 ml-auto px-3 lg:px-0" />
        </div>
        <div className="space-y-2 mb-3 lg:mb-0 font-semibold border p-4 rounded-lg text-center md:text-left">
          <p>Hi, {displayName}</p>
          <p>{email}</p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn rounded-lg py-1"
          >
            Update Profile
          </button>
        </div>
      </div>
      <EditModal
        closeModal={closeModal}
        isOpen={isOpen}
        dp={dp}
        name={name}
        handleUpdate={handleUpdate}
      ></EditModal>
    </div>
  )
}

export default MyProfile
