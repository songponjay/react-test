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
            {/* {cars.length} = เสียบค่า JS เข้าไปในข้อความ เหมือน string interpolation */}
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
            {/* cars.map(...) = วนลูปสร้างแถวจากทุกคัน — เหมือน ListView.builder ของ Flutter */}
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