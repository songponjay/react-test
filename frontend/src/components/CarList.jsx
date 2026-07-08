import {useState} from 'react'

function CarList({ cars, loading, error, onDelete , onUpdate }) {
    const [editingId, setEditingId] = useState(null)
    const [editeData, setEditeData] = useState({})

    if (loading) return <p>กำลังโหลดข้อมูล...</p>
    if (error) return <p style={{ color: 'red' }}>เกิดข้อผิดพลาด: {error}</p>

    const startEdit = (car) => {
        setEditingId(car.id)
        setEditeData({ 
            registration: car.registration,
            brand: car.brand,
            model: car.model,
            notes: car.notes,
        })
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditeData({})
    }

    const saveEdit = async (id) => {
        await onUpdate(id, editeData)
        cancelEdit()
    }

    const updateField = (field, value) => {
        setEditeData(prev => ({ ...prev, [field]: value }))
    }


    return (
        <div>
            <h2>รายการรถทั้งหมด ({cars.length} คัน)</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ทะเบียน</th>
                        <th>ยี่ห้อ</th>
                        <th>รุ่น</th>
                        <th>หมายเหตุ</th>
                        <th>จัดการ</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => {
                        const isEditing = editingId === car.id
                        return (
                            <tr key={car.id}>
                                <td>
                                    {isEditing ? (
                                        <input value={editeData.registration} 
                                        onChange={(e) => updateField('registration', e.target.value)} />
                                    ) : (
                                        car.registration
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input value={editeData.brand} 
                                        onChange={(e) => updateField('brand', e.target.value)} />
                                    ) : (
                                        car.brand
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input value={editeData.model} 
                                        onChange={(e) => updateField('model', e.target.value)} />
                                    ) : (
                                        car.model
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input value={editeData.notes}
                                        onChange={(e) => updateField('notes', e.target.value)} />
                                    ) : (
                                        car.notes
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <>
                                            <button onClick={() => saveEdit(car.id)}>บันทึก</button>
                                            <button onClick={cancelEdit}>ยกเลิก</button>
                                        </>
                                    ) : (
                                        <>  
                                            <button onClick={() => startEdit(car)}>แก้ไข</button>
                                            <button onClick={() => onDelete(car.id)}>ลบ</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )

                     /*   <tr key={car.id}>
                            <td>{car.registration}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.notes}</td>
                            <td>
                                <button onClick={() => onDelete(car.id)}>ลบ</button>
                            </td>
                        </tr> */
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CarList

//---------------------------
/*import { useState, useEffect } from 'react'

function CarList() {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/api/cars')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    return res.json()
            })
            .then(data => {
                setCars(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
    }, [])
    if (loading) return <p>กำลังโหลดข้อมูล...</p>
    if (error) return <p style={{ color: 'red' }}>เกิดข้อผิดพลาด: {error}</p>

    return (
        <div>
            <h2>รายการรถทั้งหมด ({cars.length} คัน)</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ทะเบียน</th>
                        <th>ยี่ห้อ</th>
                        <th>รุ่น</th>
                        <th>หมายเหตุ</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.registration}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CarList
*/
//---------------------------

/*
    import { useState } from 'react'

const mockCars = [
  {
    id: 1, registration: 'กข 1234', brand: 'Toyota', model: 'Camry', notes: 'รถผู้จัดการ',},
    {id: 2, registration: 'จฉ 5678', brand: 'Honda', model: 'Civic', notes: '-',},
    {id: 3, registration: 'ผว 9012', brand: 'Mazda', model: 'CX-5', notes: 'รถสำรอง',},
]
function CarList() { // cars = รายการรถปัจจุบัน, setCars = ตัวเปลี่ยนรายการ (เดี๋ยวต่อไปใช้ตอน add/delete)
    const [cars, setCars] = useState(mockCars)

    return (
        <div>
            // {cars.length} = เสียบค่า JS เข้าไปในข้อความ เหมือน string interpolation 
            <h2>รายการรถทั้งหมด ({cars.length} คัน)</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ทะเบียน</th>
                        <th>ยี่ห้อ</th>
                        <th>รุ่น</th>
                        <th>หมายเหตุ</th>
                    </tr>
                </thead>
                <tbody>
            // cars.map(...) = วนลูปสร้างแถวจากทุกคัน — เหมือน ListView.builder ของ Flutter 
                    {cars.map((car) => (
            // key={car.id} = บอก React ว่าแถวไหนคือคันเดิม (เหมือน key: Key() ใน Flutter)
            // ⚠️ ห้ามลืม key เด็ดขาด ไม่งั้น React เตือน + อาจ render ผิดตัว
                        <tr key={car.id}>
                            <td>{car.registration}</td>
                            <td>{car.brand}</td>
                            <td>{car.model}</td>
                            <td>{car.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// ส่งออกให้ไฟล์อื่น (App.jsx) เอาไปใช้ได้
export default CarList
*/
