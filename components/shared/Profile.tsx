'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Input, Label, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { toast } from "@/hooks/use-toast"
import { LoaderProfile } from "@/components/shared/LoaderProfile";

interface ProfileData {
    name: string
    inn: string
    kpp: string
    fullName: string
    phone: string
    email: string
    login: string
    username: string
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
    })

    const [loading, setLoading] = useState(true)
    const [editableData, setEditableData] = useState<ProfileData>(profileData)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [password, setPassword] = useState('')
    const router = useRouter()

    useEffect(() => {
        fetchProfileData()
    }, [])

    const fetchProfileData = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/profile')
            if (response.ok) {
                const data = await response.json()
                setProfileData(data.profile)
                setEditableData(data.profile)
                setIsAdmin(data.isAdmin)
            } else {
                console.error('Failed to fetch profile data')
                toast({
                    title: "Ошибка",
                    description: "Не удалось загрузить данные профиля",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('Error fetching profile data:', error)
            toast({
                title: "Ошибка",
                description: "Произошла ошибка при загрузке данных профиля",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditableData(prev => ({ ...prev, [name]: value }))
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await fetch('/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editableData, password }),
            })
            if (response.ok) {
                setIsEditing(false)
                setProfileData(editableData)
                setPassword('')
                toast({
                    title: "Успех",
                    description: "Профиль успешно обновлен",
                })
            } else {
                console.error('Failed to update profile')
                toast({
                    title: "Ошибка",
                    description: "Не удалось обновить профиль",
                    variant: "destructive",
                })
            }
        } catch (error) {
            console.error('Error updating profile:', error)
            toast({
                title: "Ошибка",
                description: "Произошла ошибка при обновлении профиля",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsEditing(true)
        setEditableData(profileData)
    }

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setIsEditing(false)
        setEditableData(profileData)
        setPassword('')
    }

    if (loading) {
        return <LoaderProfile />
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader className="flex justify-between items-center">
                <CardTitle>Профиль</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Контрагент (наименование) */}
                        <div>
                            <Label htmlFor="name">Контрагент (наименование)</Label>
                            <Input
                                id="name"
                                name="name"
                                value={profileData.name}
                                onChange={isEditing && isAdmin ? handleInputChange : undefined}
                                disabled={!isEditing || !isAdmin}
                            />
                        </div>
                        {/* ИНН */}
                        <div>
                            <Label htmlFor="inn">ИНН</Label>
                            <Input
                                id="inn"
                                name="inn"
                                value={profileData.inn}
                                onChange={isEditing && isAdmin ? handleInputChange : undefined}
                                disabled={!isEditing || !isAdmin}
                            />
                        </div>
                        {/* КПП */}
                        <div>
                            <Label htmlFor="kpp">КПП</Label>
                            <Input
                                id="kpp"
                                name="kpp"
                                value={profileData.kpp}
                                onChange={isEditing && isAdmin ? handleInputChange : undefined}
                                disabled={!isEditing || !isAdmin}
                            />
                        </div>
                        {/* ФИО */}
                        <div>
                            <Label htmlFor="fullName">ФИО</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                value={profileData.username}
                                onChange={isEditing && isAdmin ? handleInputChange : undefined}
                                disabled={!isEditing || !isAdmin}
                            />
                        </div>
                        {/* Телефон */}
                        <div>
                            <Label htmlFor="phone">Телефон</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={isEditing && isAdmin ? handleInputChange : undefined}
                                disabled={!isEditing || !isAdmin}
                            />
                        </div>
                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                value={profileData.email}
                                onChange={isEditing && isAdmin ? handleInputChange : undefined}
                                disabled={!isEditing || !isAdmin}
                            />
                        </div>
                        {/* Логин */}
                        <div>
                            <Label htmlFor="login">Логин</Label>
                            <Input
                                id="login"
                                name="login"
                                value={profileData.login}
                                disabled
                            />
                        </div>
                        {/* Пароль */}
                        <div>
                            <Label htmlFor="password">Пароль</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        {isEditing ? (
                            <>
                                <Button type="button" onClick={handleSubmit}>Сохранить</Button>
                                <Button type="button" variant="outline" onClick={handleCancel}>Отмена</Button>
                            </>
                        ) : (
                            <Button type="button" onClick={handleEdit}>Редактировать</Button>
                        )}
                    </div>
                </form>
                {isAdmin && (
                    <div className="mt-4 space-x-4">
                        <Button onClick={() => router.push('/billing')}>Счета</Button>
                        <Button onClick={() => router.push('/card')}>Карты</Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}