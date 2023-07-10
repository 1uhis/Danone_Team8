import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: '/uploads/defaultAvatar.png',
  },
  {
    name: 'Customer User',
    email: 'customer@example.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: '/uploads/defaultAvatar.png',
  },
  {
    name: 'Merchant User',
    email: 'merchant@example.com',
    password: bcrypt.hashSync('123456', 10),
    avatar: '/uploads/defaultAvatar.png',
  },
]

export default users
