import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Heart } from 'lucide-react';
import GreetingModal from '../../components/GreetingModal';

function UserGreetings() {
  const [greetings, setGreetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGreeting, setEditingGreeting] = useState(null);

  useEffect(() => {
    fetchUserGreetings();
  }, []);

  const fetchUserGreetings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/greetings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch greetings');
      }

      const data = await response.json();
      setGreetings(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGreeting = async (greetingData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/greetings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(greetingData)
      });

      if (!response.ok) {
        throw new Error('Failed to create greeting');
      }

      const data = await response.json();
      setGreetings([data.data, ...greetings]);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateGreeting = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/greetings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update greeting');
      }

      const data = await response.json();
      setGreetings(greetings.map(g => g._id === id ? data.data : g));
      setEditingGreeting(null);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteGreeting = async (id) => {
    if (!window.confirm('Are you sure you want to delete this greeting?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/greetings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete greeting');
      }

      setGreetings(greetings.filter(g => g._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/greetings/${id}/visibility`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to toggle visibility');
      }

      const data = await response.json();
      setGreetings(greetings.map(g => g._id === id ? data.data : g));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Greetings</h1>
        <button
          onClick={() => {
            setEditingGreeting(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Greeting
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {greetings.map((greeting) => (
          <div
            key={greeting._id}
            className="bg-white rounded-lg shadow-sm p-6"
            style={{
              backgroundColor: greeting.backgroundColor || '#ffffff',
              color: greeting.textColor || '#000000'
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">{greeting.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleVisibility(greeting._id)}
                  className="text-gray-600 hover:text-gray-800"
                  title={greeting.isPublic ? "Make Private" : "Make Public"}
                >
                  {greeting.isPublic ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
                <button
                  onClick={() => {
                    setEditingGreeting(greeting);
                    setIsModalOpen(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteGreeting(greeting._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="mb-4">{greeting.message}</p>

            <div className="flex justify-between items-center text-sm">
              <span>{greeting.occasion}</span>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{greeting.likes?.length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GreetingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingGreeting(null);
        }}
        onSubmit={editingGreeting ? 
          (data) => handleUpdateGreeting(editingGreeting._id, data) : 
          handleCreateGreeting}
        initialData={editingGreeting}
      />
    </div>
  );
}

export default UserGreetings; 