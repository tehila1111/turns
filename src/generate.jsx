import React, { useState } from 'react';
import './reception.css';
import logo from './logo.png'

const QueueSystem = () => {
    const [receptionQueue, setReceptionQueue] = useState([]);
    const [doctorQueue, setDoctorQueue] = useState([]);
    const [treatmentQueue, setTreatmentQueue] = useState([]);
    const [triageQueue, setTriageQueue] = useState([]);
    const [ECGQueue, setECGQueue] = useState([]);

    const [uniqueNumber, setUniqueNumber] = useState(0);
    const [selectedNumber, setSelectedNumber] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('reception');

    const generateUniqueNumber = () => {
        if (uniqueNumber <= 300) {
            setUniqueNumber(uniqueNumber + 1);
            return uniqueNumber;
        }
        return null;
    };

    const handleEnterReception = () => {
        const uniqueNumber = generateUniqueNumber();
        setReceptionQueue([...receptionQueue, uniqueNumber]);
    };

    const handleRedirectToDoctor = (number) => {
        setReceptionQueue(receptionQueue.filter((num) => num !== number));
        setDoctorQueue([...doctorQueue, number]);
    };

    const handleRedirectToTreatment = (number) => {
        setReceptionQueue(receptionQueue.filter((num) => num !== number));
        setTreatmentQueue([...treatmentQueue, number]);
    };

    const handleRedirectToTriage = (number) => {
        setReceptionQueue(receptionQueue.filter((num) => num !== number));
        setTriageQueue([...triageQueue, number]);
    };

    const handleRedirectToECG = (number) => {
        setReceptionQueue(receptionQueue.filter((num) => num !== number));
        setECGQueue([...ECGQueue, number]);
    };

    const handleDeleteNumber = () => {
        setReceptionQueue(receptionQueue.slice(1));
    };

    const handleMoveToHead = () => {
        const selectedQueue = getSelectedQueue();
        const updatedQueue = [parseInt(selectedNumber, 10), ...selectedQueue.filter((num) => num !== parseInt(selectedNumber, 10))];
        updateSelectedQueue(updatedQueue);
    };

    const getSelectedQueue = () => {
        switch (selectedRoom) {
            case 'doctor':
                return doctorQueue;
            case 'treatment':
                return treatmentQueue;
            case 'triage':
                return triageQueue;
            case 'ECG':
                return ECGQueue;
            default:
                return receptionQueue;
        }
    };

    const updateSelectedQueue = (updatedQueue) => {
        switch (selectedRoom) {
            case 'doctor':
                setDoctorQueue(updatedQueue);
                break;
            case 'treatment':
                setTreatmentQueue(updatedQueue);
                break;
            case 'triage':
                setTriageQueue(updatedQueue);
                break;
            case 'ECG':
                setECGQueue(updatedQueue);
                break;
            default:
                setReceptionQueue(updatedQueue);
                break;
        }
    };

    const renderNextCustomer = (queue) => {
        if (queue.length > 1) {
            return (
                <>
                    <div>מטופל הבא</div>
                    <div className='nextNum'>{queue[1]}</div>
                </>
            );
        }
        return null;
    };

    return (
        <div>

            <div className='custScreen'>

                <div className='messages'>
                    <img className='logo' style={{ height: '70px', margin: '20px' }} src={logo}></img>


                </div>
                <div className='rooms'>



                    {/* Reception Room */}
                    <div className='receptionScreen roomScreen'>
                        <div className='roomTitle'>קבלה</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{receptionQueue[0]}</div>
                        {renderNextCustomer(receptionQueue)}
                    </div>

                    {/* Treatment Room */}
                    <div className='treatmentScreen roomScreen'>
                        <div className='roomTitle'>חדר טיפולים</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{treatmentQueue[0]}</div>
                        {renderNextCustomer(treatmentQueue)}
                    </div>

                    {/* Doctor Room */}
                    <div className='doctorScreen roomScreen'>
                        <div className='roomTitle'>חדר רופא</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{doctorQueue[0]}</div>
                        {renderNextCustomer(doctorQueue)}
                    </div>

                    {/* Triage Room */}
                    <div className='triageScreen roomScreen'>
                        <div className='roomTitle'>חדר טריאג</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{triageQueue[0]}</div>
                        {renderNextCustomer(triageQueue)}
                    </div>

                    {/* ECG Room */}
                    <div className='ECGScreen roomScreen'>
                        <div className='roomTitle'>חדר אקג</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{ECGQueue[0]}</div>
                        {renderNextCustomer(ECGQueue)}
                    </div>
                </div>
            </div>

            <hr />

            <div className='custScreen'>

                <div className='reception'>
                    <div>מטופל מספר: {receptionQueue[0]}</div>
                    <div>
                        <button className='sendBtn' onClick={() => handleRedirectToDoctor(receptionQueue[0])}>
                            העבר לרופא
                        </button>
                    </div>
                    <div>
                        <button className='sendBtn' onClick={() => handleRedirectToTreatment(receptionQueue[0])}>
                            העבר לחדר טיפולים
                        </button>
                    </div>
                    <div>
                        <button className='sendBtn' onClick={() => handleRedirectToTriage(receptionQueue[0])}>
                            העבר לחדר טריאג
                        </button>
                    </div>
                    <div>
                        <button className='sendBtn' onClick={() => handleRedirectToECG(receptionQueue[0])}>
                            העבר לחדר אקג
                        </button>
                    </div>

                    {/* Reception Actions - Delete and Move to Head */}
                    <div className='actions'>
                        <div>
                            <button className='endTreatment' onClick={handleDeleteNumber}>
                                סיום טיפול
                            </button>
                        </div>
                        <div>
                            <div>
                                מספר להעברה לראש התור:
                                <select
                                    value={selectedNumber}
                                    onChange={(e) => setSelectedNumber(e.target.value)}
                                >
                                    {receptionQueue.map((number, index) => (
                                        <option key={index} value={number}>{number}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                חדר:
                                <select
                                    value={selectedRoom}
                                    onChange={(e) => setSelectedRoom(e.target.value)}
                                >
                                    <option value='reception'>קבלה</option>
                                    <option value='doctor'>רופא</option>
                                    <option value='treatment'>טיפולים</option>
                                    <option value='triage'>טריאג'</option>
                                    <option value='ECG'>אקג</option>
                                </select>
                            </div>
                            <button className='moveToHeadBtn' onClick={handleMoveToHead}>
                                העבר לראש התור
                            </button>
                        </div>
                    </div>
                </div>
                <div className='rooms'>



                    {/* Reception Room */}
                    <div className='receptionScreen roomScreen'>
                        <div className='roomTitle'>קבלה</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{receptionQueue[0]}</div>
                        {renderNextCustomer(receptionQueue)}
                    </div>

                    {/* Treatment Room */}
                    <div className='treatmentScreen roomScreen'>
                        <div className='roomTitle'>חדר טיפולים</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{treatmentQueue[0]}</div>
                        {renderNextCustomer(treatmentQueue)}
                    </div>

                    {/* Doctor Room */}
                    <div className='doctorScreen roomScreen'>
                        <div className='roomTitle'>חדר רופא</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{doctorQueue[0]}</div>
                        {renderNextCustomer(doctorQueue)}
                    </div>

                    {/* Triage Room */}
                    <div className='triageScreen roomScreen'>
                        <div className='roomTitle'>חדר טריאג</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{triageQueue[0]}</div>
                        {renderNextCustomer(triageQueue)}
                    </div>

                    {/* ECG Room */}
                    <div className='ECGScreen roomScreen'>
                        <div className='roomTitle'>חדר אקג</div>
                        <div>מטופל נוכחי</div>
                        <div className='currentNum'>{ECGQueue[0]}</div>
                        {renderNextCustomer(ECGQueue)}
                    </div>
                </div>
            </div>
            <hr />

            {/* מסך לקוח - קבלת מספר */}
            <div className='customer'>
                <div>לחץ כאן לקבלת מספר</div>
                <div className='enterNumber'>
                    <button className='getNumber' onClick={handleEnterReception}>קבלת תור</button>
                </div>
                <div className='saveNumber'>יש לשמור את המספר לאורך הטיפול</div>
            </div>

            {/* Current Queue Display */}
            <div>
                <strong>תור קבלה:</strong> {receptionQueue.join(', ')}
            </div>
            <div>
                <strong>תור רופא:</strong> {doctorQueue.join(', ')}
            </div>
            <div>
                <strong>תור טריאג':</strong> {triageQueue.join(', ')}
            </div>
            <div>
                <strong>תור טיפולים:</strong> {treatmentQueue.join(', ')}
            </div>
            <div>
                <strong>תור אקג:</strong> {ECGQueue.join(', ')}
            </div>

            <hr />

            {/* Reception Actions */}

        </div>
    );
};

export default QueueSystem;
