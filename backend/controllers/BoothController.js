import Booth from "../models/BoothModel.js";
import Users from "../models/UserModel.js";




export const getBooth = async (req, res) => {
    try {
        const booths = await Booth.findAll(); 
        res.json(booths); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
};


export const getBoothById = async (req, res) => {
    try {
        const booth = await Booth.findByPk(req.params.uuid); 
        if (!booth) return res.status(404).json({ message: "Booth not found" }); 
        res.json(booth); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createBooth = async (req, res) => {
    const { uuid, name, openingTime, closingTime, userId } = req.body; 
    try {
        const newBooth = await Booth.create({  uuid, name, openingTime, closingTime, userId }); 
        res.status(201).json(newBooth);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBooth = async (req, res) => {
    try {
        const booth = await Booth.findByPk(req.params.id); 
        if (!booth) return res.status(404).json({ message: "Booth not found" }); 

        // Mengupdate data seller
        const { name, openingTime, closingTime, userId } = req.body;
        booth.name = name || booth.name;
        booth.openingTime = openingTime || booth.openingTime;
        booth.closingTime = closingTime || booth.closingTime;   
        booth.userId = userId || booth.userId;

        await booth.save(); // Menyimpan perubahan
        res.json(booth); // Mengirimkan data booth yang diperbarui
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteBooth = async (req, res) => {
    try {
        const booth = await Booth.findByPk(req.params.id); // Mencari booth berdasarkan ID
        if (!booth) return res.status(404).json({ message: "Booth not found" }); // Menangani jika tidak ditemukan

        await booth.destroy(); // Menghapus booth
        res.json({ message: "Booth deleted" }); // Mengirimkan respons bahwa seller dihapus
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBoothByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      console.log('User ID:', userId);

      // Validasi userId
    if (!userId || isNaN(userId)) {
        return res.status(400).json({ message: 'Invalid userId parameter' });
      }

      const booths = await Booth.findOne({
        where: { userId },
        include: {
            model: Users,
            as: 'user',
            attributes: ['id', 'name', 'uuid'],
        }
      });
  
     
      if (!booths) { // Cek jika booth tidak ditemukan
        return res.status(404).json({ message: 'Booth not found for this user' });
    }
  
      // Mengembalikan daftar booth
      return res.status(200).json({
        userId,
        booths,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  };