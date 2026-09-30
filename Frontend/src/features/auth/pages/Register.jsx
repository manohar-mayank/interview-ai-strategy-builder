import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
                <h1 className="text-3xl font-semibold">Loading.......</h1>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-slate-100">
            <div className="w-full max-w-[420px] rounded-xl border border-slate-800 bg-slate-900/90 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.35)] sm:p-7">
                <div className="mb-6">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">Create account</p>
                    <h1 className="text-[28px] font-semibold tracking-[-0.04em] text-white">Join the prep</h1>
                </div>

                <p className="mb-5 text-[14px] leading-6 text-slate-400">Build a stronger interview strategy with AI-powered guidance.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-slate-200">Username</label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter username"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-200">Email</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-slate-200">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-500/10"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 w-full rounded-lg bg-[#e8edf5] px-3.5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-slate-400/20 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-5 text-center text-sm text-slate-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-slate-200 transition hover:text-white">
                        Login
                    </Link>
                </p>
            </div>
        </main>
    )
}

export default Register