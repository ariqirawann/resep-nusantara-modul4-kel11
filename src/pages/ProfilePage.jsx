import { useContext } from 'react';
import { ProfileContext } from '../main';

export default function ProfilePage() {
  const { profilePictures, handleProfilePictureChange } = useContext(ProfileContext);

  const initialMembers = [
    { name: 'Ariq Fariz Fakhri Irawan', nim: '21120123130095' },
    { name: 'Muhammad Azka Wijasena', nim: '21120123140125' },
    { name: 'Ulwan Terry Attartsauri', nim: '211201220170001' },
    { name: 'Farras Sheehan Arnantyo', nim: '21120123130052' },
  ];

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image smaller than 5MB.');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          handleProfilePictureChange(index, e.target.result);
        } catch (error) {
          console.error('Error updating profile picture:', error);
          alert('Error updating profile picture. Please try again.');
        }
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-4 md:p-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Profile Tim
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Anggota Tim</h2>
          <div className="space-y-6">
            {initialMembers.map((member, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mb-2 flex items-center justify-center overflow-hidden">
                      {profilePictures[index] ? (
                        <img src={profilePictures[index]} alt={`${member.name} Profile`} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-gray-500 text-xs">No Image</span>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(index, e)}
                      className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-medium text-gray-800">{member.name}</h3>
                    <p className="text-gray-600">NIM: {member.nim}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

