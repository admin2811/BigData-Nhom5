import { motion } from "framer-motion";
import { Search } from "lucide-react";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormScore from "./FormScore";
import { useState, useEffect } from 'react';
axios.defaults.baseURL = 'http://localhost:8080';

const ScoreTable = () => {
    const [addSection, setAddSection] = useState(false);
	const [data, setData] = useState([]);
	const [addDelete , setAddDelete] = useState(false);
	const [selectedUserId, setSelectedUserId] = useState("");
	const [editSection, setEditSection] = useState(false);
    const handleDeleteClick = (id) => {
		setSelectedUserId(id);
		setAddDelete(true);
	};

    const [formData, setFormData] = useState({
        code: "",
        name: "",
        codeSubject: "",
        nameSubject: "",
        scoreMid: "",
        scoreEnd: "",
        scoreTotal: "",
    })
    const [formDataEdit, setFormDataEdit] = useState({
		code: "",
        name: "",
        codeSubject: "",
        nameSubject: "",
        scoreMid: "",
        scoreEnd: "",
        scoreTotal: "",
		_id: "",
	})
    const handleOnChange = (e) => {
		const {value, name } = e.target;
		setFormData((preve) => {
			return{
				...preve,
				[name] : value
			}
		})
	}
    const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await axios.post("/scores/create", formData);
		console.log(data);
		if(data.data.success){
			toast.success("Student added successfully");
		}
		setFormData({
			code: "",
            name: "",
            codeSubject: "",
            nameSubject: "",
            scoreMid: "",
            scoreEnd: "",
            scoreTotal: "",
		});
		setAddSection(false);
		getFetchData();
	}
    const getFetchData = async () => {
		const data = await axios.get("/scores");
		console.log(data);
		if(data.data.success){
			setData(data.data.data);
		}
	}
    const handleDelete = async (id) => {
		const data = await axios.delete(`/scores/delete/${id}`);
		if(data.data.success){
			toast.success("Student deleted successfully");
			getFetchData();
		}
		setAddDelete(false);
	}
    const handleUpdate = async (e) => {
		e.preventDefault()
		const data = await axios.put("/scores/update", formDataEdit);
		if(data.data.success){
			toast.success("Student updated successfully");
			setEditSection(false);
		}
		getFetchData();
	}
    const handleEditChange = async (e) => {
		const {value, name } = e.target;
		setFormDataEdit((preve) => {
			return{
				...preve,
				[name] : value
			}
		})
	}
    const handleEdit = (user) => {
		setFormDataEdit(user)	
		setEditSection(true);
	}
    useEffect(() => {
		getFetchData();
		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				setAddSection(false);
				setEditSection(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

    const [dataMapReduce, setDataMapReduce] = useState([]);
    const [mapReduce, setMapReduce] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/results');
                setDataMapReduce(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    const [message, setMessage] = useState('');

    const handleMapReduceClick = async () => {
        setMapReduce(prev => !prev);
        if (!mapReduce) {
            try {
                const response = await axios.post('http://localhost:8080/api/mapreduce');
                setMessage(response.data.message); // Cập nhật thông báo thành công
            } catch (error) {
                console.error('Error during MapReduce:', error);
                setMessage('MapReduce failed.'); // Cập nhật thông báo lỗi
            }
        }
    };
    return (
        <div className="relative">
			<motion.div
				className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-semibold text-gray-100'>Score</h2>
					<button
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
						onClick={() => setAddSection(true)}
					>
						Add +
					</button>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search users...'
							className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
				</div>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Code</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Code Subject</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Name Subject</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Mid Score</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Last Score</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Total Score</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>Actions</th>
							</tr>
						</thead>
						<tbody className='divide-y divide-gray-700'>
							{ data[0] ? (
								data.map((user) => {
								return (
								<motion.tr
									key={user.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.code}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='flex items-center'>
											<div className='flex-shrink-0 h-10 w-10'>
												<div className='h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold'>
													{user.name.charAt(0)}
												</div>
											</div>
											<div className='ml-4'>
												<div className='text-sm font-medium text-gray-100'>{user.name}</div>
											</div>
										</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.codeSubject}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.nameSubject}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
										>
											{user.scoreMid}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<div className='text-sm text-gray-300'>{user.scoreEnd}</div>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>
										<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100'>
											{user.scoreTotal}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2' onClick={() => handleEdit(user)}>Edit</button>
										<button className='text-red-400 hover:text-red-300' onClick={() =>  handleDeleteClick(user._id)}>Delete</button>
									</td>
								</motion.tr>
								);
							})): (
								<p>No data</p>
							)
						}
						</tbody>
					</table>
				</div>
			</motion.div>
            <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            onClick={handleMapReduceClick}
            >
                Map Reduce
            </button>
            {message && <p>{message}</p>}
            {
                mapReduce && (
                    <div>
                        <h1>Danh sách điểm số</h1>
                        <ul>
                            {dataMapReduce.map(item => (
                                <li key={item._id}>
                                    Môn: {item._id}, Học sinh: {item.value.name}, Tổng điểm: {item.value.scoreTotal}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
			{
				editSection && (
					<FormScore
						handleOnChange={handleEditChange}
						handleSubmit={handleUpdate}
						rest={formDataEdit}
					/>
				)
			}
			{addDelete && (
				<>
					<div className="fixed inset-0 bg-black opacity-50 z-10"></div>
					<motion.div 
						id="alert-additional-content-4" 
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300
						 dark:border-yellow-800 mx-auto z-20 absolute top-0 left-0 right-0" role="alert">
						<div className="flex items-center">
							<svg className="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
							<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
							</svg>
							<span className="sr-only">Info</span>
							<h3 className="text-lg font-medium">This is a warning alert</h3>
						</div>
						<div className="mt-2 mb-4 text-sm">
							Are you sure you want to delete user with ID: {selectedUserId}?
						</div>
						<div className="flex">
							<button 
								type="submit"
								onClick={() => handleDelete(selectedUserId)}
								className="text-white bg-yellow-800 hover:bg-yellow-900 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-yellow-300 dark:text-gray-800 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800">
								Are you sure to Delete?
							</button>
							<button 
							type="button" 
							onClick={() => setAddDelete(false)}
							className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800" data-dismiss-target="#alert-additional-content-4" aria-label="Close">
							Dismiss
							</button>
						</div>
					</motion.div>
				</>
			)
			}
			{addSection && (
				<FormScore
						handleOnChange={handleOnChange}
						handleSubmit={handleSubmit}
						rest = {formData}
				/>
			)}
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
				
				/>
		</div>
    )
}

export default ScoreTable;