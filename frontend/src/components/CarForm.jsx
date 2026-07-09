import {useState} from 'react'

function CarForm( {onAdd } ) {
    const [registration, setRegistration] = useState('')
    const [brand, setBrand] = useState('')
    const [model, setModel] = useState('')
    const [notes, setNotes] = useState('')
    const [year, setYear] = useState('')
    const [status, setStatus] = useState('พร้อมใช้งาน')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
            const res = await fetch('http://localhost:3001/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ registration, brand, model, year, notes, status }),
            })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)

                const newCar = await res.json()
                onAdd(newCar)
                setRegistration('')
                setBrand('')
                setModel('')
                setNotes('')
                setYear('')
                setStatus('พร้อมใช้งาน')
        } catch (err) {
            alert('เพิ่มไม่สำเร็จ: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '1rem',display: 'flex', gap: '8px' , flexWrap: 'wrap'}}>
            <input
                placeholder="ทะเบียน"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                required
            />
            <input
                placeholder="ยี่ห้อ"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
            />
            <input
                placeholder="รุ่น"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
            />
            <input
                placeholder="ปีรถ (เช่น 2020)"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ width: '100px' }}
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}  
            >
                <option value="พร้อมใช้งาน">พร้อมใช้งาน</option>
                <option value="ไม่พร้อมใช้งาน">ใช้งานอยู่</option>
                <option value="ซ่อมบำรุง">ซ่อมบำรุง</option>
            </select>
            <input
                placeholder="หมายเหตุ"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button type="submit" disabled={submitting}>
                {submitting ? 'กำลังเพิ่ม...' : '+ เพิ่มรถ'}
            </button>
        </form>
    )
}

export default CarForm