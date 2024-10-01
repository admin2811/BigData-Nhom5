import PropTypes from 'prop-types';

const FormScore = ({ handleOnChange, handleSubmit, rest }) => {
    const handleSubmitForm = (e) => {
        e.preventDefault(); // Ngăn chặn hành động mặc định của form
		const newScoreTotal = (Number(rest.scoreEnd) || 0) + (Number(rest.scoreMid) || 0);
        rest.scoreTotal = newScoreTotal;
        handleSubmit(e); // Gọi hàm submit
    };
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
            <div className="w-full max-w-md bg-[#1c2534] rounded-xl shadow-md py-8 px-8 mx-auto z-20 absolute top-20 left-0 right-0">
                <h2 className="text-[28px] font-bold text-white mb-6 text-center">Add User</h2>
                <form className="flex flex-col" onSubmit={handleSubmitForm}>
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
                        <input placeholder="Code Subject" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="string" 
                            onChange={handleOnChange}
                            name="codeSubject"
                            value={rest.codeSubject}
                        />
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <input placeholder="aName Subject" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="text" 
                            onChange={handleOnChange}
                            name="nameSubject"
                            value={rest.nameSubject}
                        />
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <input placeholder="Mid Score" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="number" 
                            onChange={handleOnChange}
                            name="scoreMid"
                            value={rest.scoreMid}
                        />
                    </div>
                    <div className="flex space-x-4 mb-4">
                        <input placeholder="End Score" className="bg-gray-700 text-white border-0 rounded-md p-2 w-full focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150" type="number" 
                            onChange={handleOnChange} 
                            name="scoreEnd"
                            value={rest.scoreEnd}
                        />
                    </div>
                    <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-indigo-600 hover:to-blue-600 transition ease-in duration-200" type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

FormScore.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    rest: PropTypes.object,
};

export default FormScore;
