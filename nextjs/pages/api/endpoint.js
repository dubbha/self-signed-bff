import axios from 'axios';

export default async function handler(req,res) {
  try {
    const { data } = await axios.get('https://bff.local/');
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error });
  }
}
