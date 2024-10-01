import PropTypes from 'prop-types';
const FormUser = ({handleOnChange, handleSubmit,rest}) => {
  return (<>
        <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
					<div className="w-full max-w-md bg-[#1c2534] rounded-xl shadow-md py-8 px-8 mx-auto z-20 absolute top-20 left-0 right-0">
						<h2 className="text-[28px] font-bold text-white mb-6 text-center">Add User</h2>
						<form className="flex flex-col" onSubmit={handleSubmit}>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Code" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="text" 
									onChange={handleOnChange}
									name="code"
                                    value={rest.code}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Name" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="text" 
									onChange={handleOnChange}
									name="name"
                                    value={rest.name}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Date Of Birth" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="date" 
									onChange={handleOnChange}
									name="dateOfBirth"
                                    value={rest.dateOfBirth}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="address" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="text" 
									onChange={handleOnChange}
									name="address"
                                    value={rest.address}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Sex" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="select" 
									onChange={handleOnChange}
									name="sex"
                                    value={rest.sex}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Email" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="email" 
									onChange={handleOnChange} name="email"
                                    value={rest.email}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="mobile" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="number" 
									onChange={handleOnChange}
									name="mobile"
                                    value={rest.mobile}
								/>
							</div>
							<div className="flex space-x-4 mb-4">
								<input placeholder="Class" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="text" 
									onChange={handleOnChange}
									name="class"
                                    value={rest.class}
								/>
							</div>
							<button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200" type="submit">Submit</button>
						</form>
					</div>
            </>
  )
}
FormUser.propTypes = {
	handleOnChange: PropTypes.func.isRequired, // Validate handleOnChange
	handleSubmit: PropTypes.func.isRequired,
	rest: PropTypes.object,
  };
export default FormUser
