import React from 'react';
import { User, UserStatus, Role } from '../../types';
import Card from '../common/Card';

interface UserManagementPageProps {
  users: User[];
  updateUser: (userId: number, updates: Partial<User>) => void;
}

const UserManagementPage: React.FC<UserManagementPageProps> = ({ users, updateUser }) => {
    const getStatusColor = (status: UserStatus) => {
        switch (status) {
          case UserStatus.APPROVED: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
          case UserStatus.PENDING: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
          case UserStatus.REJECTED: return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
          default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };
    
    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manajemen Pengguna</h2>
            <Card>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-brand-blue dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nama</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Kantor</th>
                                <th scope="col" className="px-6 py-3">Departemen</th>
                                <th scope="col" className="px-6 py-3">Role</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="bg-white border-b dark:bg-brand-blue-light dark:border-brand-gray">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</th>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.office}</td>
                                    <td className="px-6 py-4">{user.department}</td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={user.role} 
                                            onChange={(e) => updateUser(user.id, { role: e.target.value as Role })}
                                            className="text-xs p-1 rounded-md bg-gray-50 dark:bg-brand-blue border border-gray-300 dark:border-brand-gray"
                                        >
                                            {Object.values(Role).map(role => <option key={role} value={role}>{role}</option>)}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 space-x-1">
                                        {user.status === UserStatus.PENDING && (
                                            <>
                                                <button onClick={() => updateUser(user.id, { status: UserStatus.APPROVED })} className="text-xs text-white bg-green-500 hover:bg-green-600 px-2 py-1 rounded">Setujui</button>
                                                <button onClick={() => updateUser(user.id, { status: UserStatus.REJECTED })} className="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded">Tolak</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default UserManagementPage;
