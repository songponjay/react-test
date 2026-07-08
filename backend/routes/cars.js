const express = require('express');
const router = express.Router();
const db = require('../database/database');

    router.get('/', (req, res) => {
        const cars = db.prepare('SELECT * FROM cars ORDER BY id DESC').all();
        res.json(cars);
    });

    router.post('/', (req, res) => {
    const { registration, brand, model, notes } = req.body;

    if (!registration || !brand || !model) {
        return res.status(400).json({ error: 'ใส่ข้อมูลไม่ครบ' });
    }

    const result = db.prepare('INSERT INTO cars (registration, brand, model, notes) VALUES (?, ?, ?, ?)')
        .run(registration, brand, model, notes || '');
    const newCar = db.prepare('Select * from cars Where id = ?')
    .get(result.lastInsertRowid);
    res.status(201).json(newCar);
    });
    
    router.put('/:id', (req, res) => {
        const {registration , brand, model, notes} = req.body;
        const {id} = req.params;
        
        const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(id);
        if (!car) 
            return res.status(404).json({ error: 'ไม่พบรถที่ต้องการแก้ไข' });

            db.prepare('UPDATE cars SET registration = ?, brand = ?, model = ?, notes = ? WHERE id = ?')
            .run(registration, brand, model, notes || '', id);

            const updated = db.prepare('Select * From cars Where id = ?')
            .get(id);
            res.json(updated);

    });

    router.delete('/:id', (req, res) => {
        const{id} = req.params;

        const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(id);
        if (!car)
            return res.status(404).json({ error: 'ไม่พบรถที่ต้องการลบ' });

        db.prepare('DELETE FROM cars WHERE id = ?').run(id);

        res.json({ message: 'ลบรถเรียบร้อย!' });
    });

module.exports = router;