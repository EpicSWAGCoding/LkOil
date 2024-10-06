import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label
} from '@/components/ui';
import { formatPhoneNumber, toast, useFormatCardNumber } from '@/hooks';
import { LoaderProfile } from '@/components/shared';

interface ProfileData {
    name: string;
    inn: string;
    kpp: string;
    fullName: string;
    phone: string;
    email: string;
    login: string;
    username: string;
}

export const Profile = () => {
    const [profileData, setProfileData] = useState<ProfileData>({
        name: '',
        inn: '',
        kpp: '',
        fullName: '',
        phone: '',
        email: '',
        login: '',
        username: ''
    });
    
    const [loading, setLoading] = useState(true);
    const [editableData, setEditableData] = useState<ProfileData>(profileData);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isPinModalOpen, setIsPinModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [currentPin, setCurrentPin] = useState('');
    const [newPin, setNewPin] = useState('');
    
    // Вызов хука для форматирования номера карты
    const formattedCardNumber = useFormatCardNumber(editableData.login);
    
    useEffect(() => {
        fetchProfileData();
    }, []);
    
    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/profile');
            if (response.ok) {
                const data = await response.json();
                setProfileData(data.profile);
                setEditableData(data.profile);
                setIsAdmin(data.isAdmin);
            } else {
                console.error('Failed to fetch profile data');
                toast({
                    title: "Ошибка",
                    description: "Не удалось загрузить данные профиля",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            toast({
                title: "Ошибка",
                description: "Произошла ошибка при загрузке данных профиля",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditableData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableData),
            });
            if (response.ok) {
                setIsEditing(false);
                setProfileData(editableData);
                toast({
                    title: "Успех",
                    description: "Профиль успешно обновлен",
                });
            } else {
                console.error('Failed to update profile');
                toast({
                    title: "Ошибка",
                    description: "Не удалось обновить профиль",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: "Ошибка",
                description: "Произошла ошибка при обновлении профиля",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(true);
        setEditableData(profileData);
    };
    
    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsEditing(false);
        setEditableData(profileData);
    };
    
    const handlePasswordChange = async () => {
        // Здесь должна быть логика для изменения пароля
        console.log('Changing password:', { currentPassword, newPassword });
        setIsPasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
    };
    
    const handlePinChange = async () => {
        // Здесь должна быть логика для изменения PIN-кода
        console.log('Changing PIN:', { currentPin, newPin });
        setIsPinModalOpen(false);
        setCurrentPin('');
        setNewPin('');
    };
    
    if (loading) {
        return <LoaderProfile />;
    }
    
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
          <CardHeader className="flex justify-between items-center">
              <CardTitle>Профиль</CardTitle>
          </CardHeader>
          <CardContent>
              <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <Label htmlFor="name">Контрагент (наименование)</Label>
                          <Input
                            id="name"
                            name="name"
                            value={editableData.name}
                            onChange={isEditing && isAdmin ? handleInputChange : undefined}
                            disabled={!isEditing || !isAdmin}
                          />
                      </div>
                      <div>
                          <Label htmlFor="inn">ИНН</Label>
                          <Input
                            id="inn"
                            name="inn"
                            value={editableData.inn}
                            onChange={isEditing && isAdmin ? handleInputChange : undefined}
                            disabled={!isEditing || !isAdmin}
                          />
                      </div>
                      <div>
                          <Label htmlFor="fullName">ФИО</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={editableData.username}
                            onChange={isEditing && isAdmin ? handleInputChange : undefined}
                            disabled={!isEditing || !isAdmin}
                          />
                      </div>
                      <div>
                          <Label htmlFor="phone">Телефон</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formatPhoneNumber(editableData.phone)}
                            onChange={isEditing && isAdmin ? handleInputChange : undefined}
                            disabled={!isEditing || !isAdmin}
                          />
                      </div>
                      <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            value={editableData.email}
                            onChange={isEditing && isAdmin ? handleInputChange : undefined}
                            disabled={!isEditing || !isAdmin}
                          />
                      </div>
                      <div>
                          <Label htmlFor="login">Номер карты</Label>
                          <Input
                            id="login"
                            name="login"
                            value={formattedCardNumber} // Используем отформатированный номер карты
                            disabled
                          />
                      </div>
                      <div>
                          <Label htmlFor="password">Пароль</Label>
                          <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                              <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">Изменить пароль</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px] bg-white">
                                  <DialogHeader>
                                      <DialogTitle>Изменение пароля</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="current-password" className="text-right">
                                              Текущий пароль
                                          </Label>
                                          <Input
                                            id="current-password"
                                            type="password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="col-span-3"
                                          />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                          <Label htmlFor="new-password" className="text-right">
                                              Новый пароль
                                          </Label>
                                          <Input
                                            id="new-password"
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="col-span-3"
                                          />
                                      </div>
                                  </div>
                                  <DialogFooter>
                                      <Button type="button" variant="outline" onClick={() => setIsPasswordModalOpen(false)}>Отменить</Button>
                                      <Button onClick={handlePasswordChange}>Сохранить</Button>
                                  </DialogFooter>
                              </DialogContent>
                          </Dialog>
                      </div>
                  </div>
                  {isAdmin && (
                    <Button type="button" onClick={handleEdit}>
                        {isEditing ? 'Сохранить' : 'Редактировать'}
                    </Button>
                  )}
              </form>
          </CardContent>
      </Card>
    );
};