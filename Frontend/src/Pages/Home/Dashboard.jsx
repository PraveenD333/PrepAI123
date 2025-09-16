import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import { CARD_BG } from '../../utils/data'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../../Components/Layouts/DashboardLayout'
import SummaryCard from '../../Components/Cards/SummaryCard'
import Modal from '../../Components/Modal'
import moment from 'moment'
import axios from 'axios'
import CreateSessionForm from './CreateSessionForm'
import DeleteAlertContent from '../../Components/DeleteAlertContent'
import toast from 'react-hot-toast'
import image from '../../assets/particles.gif'

const Dashboard = () => {

  const navigate = useNavigate()

  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  const fetchAllSessions = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/sessions/my-sessions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }

      })
      console.log(response);

      setSessions(response.data.session)
    } catch (error) {
      console.error("Error Fetching session data:", error);
    }

  }

  const deleteSessions = async (sessionData) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/sessions/${sessionData?._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({
        open: false,
        data: null,
      });
      setTimeout(() => fetchAllSessions(), 300)
    } catch (error) {
      console.error("Error deleting session data:", error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className='w-full min-h-screen relative bg-black'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {sessions?.map((data, index) => (
            <SummaryCard
              key={data?._id}
              colors={CARD_BG[index % CARD_BG.length]}
              role={data?.role || ""}
              topicsToFocus={data?.topicsToFocus || ""}
              experience={data?.experience || ""}
              questions={data?.questions?.length || ""}
              description={data?.description || ""}
              lastUpdated={data?.updatedAt
                ? moment(data.updatedAt).format("DD MM YYYY") : ""}

              onSelect={() => navigate(`/interview-prep/${data?._id}`)}
              onDelete={() => setOpenDeleteAlert({ open: true, data })}
            />
          ))}
        </div>

        <div className="fixed bottom-10 md:bottom-20 right-10 md:right-20 p-[2px] rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-yellow-500 transition-transform transform hover:-translate-y-1 duration-300 ease-in-out hover:shadow-[0_3px_30px_rgba(255,_105,_180,_0.8)]">
          <button
            onClick={() => setOpenCreateModel(true)}
            className='h-12 md:h-12 flex items-center justify-center gap-3 bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer w-full'>
            <LuPlus className='text-2xl' />
            Add New
          </button>
        </div>

      </div>
      <Modal
        isOpen={openCreateModel}
        onClose={() => {
          setOpenCreateModel(false)
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null });
        }}
        title="Delete Alert">
        <div className='w-[30vw]'>
          <DeleteAlertContent
            content="Are You Sure You Want to Delete This Session Details?"
            onDelete={() => deleteSessions(openDeleteAlert.data)} />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard