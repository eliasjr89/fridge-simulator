import Food from '../models/food.js';


// Create new food:

export const createFood = async (req, res) => {
    try {
        const { name, category, expirationDate, quantity, imageUrl } = req.body;

        if (!name || !category || !expirationDate || quantity === undefined) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const food = new Food({ name, category, expirationDate, quantity, imageUrl });
        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get food by Id:

export const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ error: "Food not found" });
        res.json(food);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get all foods:
export const getFoods = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, expiringSoon } = req.query;
        const filter = {};

        if (category) filter.category = category;

        if (expiringSoon === 'true') {
            const now = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(now.getDate() + 7);
            filter.expirationDate = { $gte: now, $lte: nextWeek }; // CORRECCIÓN
        }

        const foods = await Food.find(filter) // <-- Falta aplicar el filtro aquí
            .sort({ expirationDate: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const total = await Food.countDocuments(filter);

        res.json({
            total,
            page: parseInt(page),
            pageSize: foods.length,
            foods,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a food:
export const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, expirationDate, quantity, imageUrl } = req.body;

        const food = await Food.findByIdAndUpdate(id, { name, category, expirationDate, quantity, imageUrl }, { new: true });

        if (!food) return res.status(404).json({ error: 'Alimento no encontrado' });
        res.json(food);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete a food:

export const deleteFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) return res.status(404).json({error: 'Food not found'});
        res.json({ message: 'Food deleted successfully' });
    } catch (error) {
            res.status(400).json({error: error.message});
    }
}