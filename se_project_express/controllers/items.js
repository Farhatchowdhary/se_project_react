import ClothingItem from '../models/item.js';

// Get items - return all clothing items
export const getItems = async (req, res) => {
 console.log("🔥 GET /api/items called");
  try {
    const items = await ClothingItem.find({});
    return res.status(200).json({ status: 'success', data: items });
  } catch (err) {
    console.error('Get Items Error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Server error while fetching items' });
  }
};

// Post /items - create a new clothing item
export const createItem = async (req, res) => {
  try {
    const { name, weather, imageUrl } = req.body;
    const ownerId = req.user._id;

    const item = await ClothingItem.create({
      name,
      weather,
      imageUrl,
      owner: ownerId,
    });

    return res.status(201).json({ status: 'success', data: item });
  } catch (err) {
    console.error('Create Item Error:', err.message);
    return res.status(400).json({ status: 'error', message: 'Invalid data or server error' });
  }
};

// Delete item - only by owner
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;      // changed from itemId
    const userId = req.user._id;

    const item = await ClothingItem.findById(id);  // changed from itemId
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }

    if (item.owner.toString() !== userId.toString()) {
      return res.status(403).json({ status: 'error', message: 'You are not authorized to delete this item' });
    }

    await ClothingItem.findByIdAndDelete(id); // changed from itemId
    return res.status(200).json({ status: 'success', message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete Item Error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Server error while deleting item' });
  }
};

// Like item
export const likeItem = async (req, res) => {
  try {
    const { id } = req.params;  // changed from itemId

    const item = await ClothingItem.findByIdAndUpdate(
      id,                      // changed from itemId
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }

    return res.status(200).json({ status: 'success', data: item });
  } catch (err) {
    console.error('Like Item Error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Server error while liking item' });
  }
};

// Dislike item
export const dislikeItem = async (req, res) => {
  try {
    const { id } = req.params;  // changed from itemId

    const item = await ClothingItem.findByIdAndUpdate(
      id,                      // changed from itemId
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }

    return res.status(200).json({ status: 'success', data: item });
  } catch (err) {
    console.error('Dislike Item Error:', err.message);
    return res.status(500).json({ status: 'error', message: 'Server error while disliking item' });
  }
};
