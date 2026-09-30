import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth.js'
import { useNavigate } from 'react-router'

const Home = () => {
    const { loading, generateReport, reports } = useInterview()
    const { handleLogout } = useAuth()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFileName, setResumeFileName] = useState("")
    const resumeInputRef = useRef(null)
    const navigate = useNavigate()

    const canGenerateReport = Boolean(jobDescription.trim() || selfDescription.trim() || resumeFileName)

    const handleGenerateReport = async () => {
        if (!canGenerateReport) return

        const resumeFile = resumeInputRef.current?.files?.[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data?._id) navigate(`/interview/${data._id}`)
    }

    if (loading) {
        return (
            <main className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
                <h1 className="text-3xl font-semibold md:text-4xl">Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 md:px-6">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-8">
                <div className="flex w-full justify-end">
                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400/40"
                    >
                        Log out
                    </button>
                </div>
                <header className="max-w-3xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        Create Your Custom <span className="text-pink-500">Interview Plan</span>
                    </h1>
                    <p className="mt-4 text-sm text-slate-300 md:text-base">
                        Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                    </p>
                </header>

                <div className="w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/80 shadow-2xl shadow-pink-950/20">
                    <div className="flex flex-col lg:flex-row">
                        <div className="flex-1 border-b border-slate-700 p-5 lg:border-b-0 lg:border-r lg:p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/10 text-pink-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                                </span>
                                <h2 className="text-base font-semibold text-white">Target Job Description</h2>
                                <span className="rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-pink-400">
                                    Required
                                </span>
                            </div>

                            <textarea
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                className="h-[260px] w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-500/10"
                                placeholder="Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                                maxLength={5000}
                            />

                            <div className="mt-3 flex justify-end text-xs text-slate-400">
                                {jobDescription.length} / 5000 chars
                            </div>
                        </div>

                        <div className="hidden w-px bg-slate-700 lg:block" />

                        <div className="flex-1 p-5 lg:p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500/10 text-pink-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </span>
                                <h2 className="text-base font-semibold text-white">Your Profile</h2>
                            </div>

                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200">
                                        Upload Resume
                                        <span className="rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-pink-400">
                                            Best Results
                                        </span>
                                    </label>

                                    <label htmlFor="resume" className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/70 px-4 py-7 text-center transition hover:border-pink-500 hover:bg-pink-500/5">
                                        <span className="text-slate-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                        </span>
                                        <p className="text-sm font-medium text-slate-100">
                                            {resumeFileName || 'Click to upload or drag & drop'}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {resumeFileName ? 'Resume uploaded' : 'PDF or DOCX (Max 5MB)'}
                                        </p>
                                        <input
                                            ref={resumeInputRef}
                                            onChange={(e) => setResumeFileName(e.target.files?.[0]?.name || "")}
                                            hidden
                                            type="file"
                                            id="resume"
                                            name="resume"
                                            accept=".pdf,.docx"
                                        />
                                    </label>
                                </div>

                                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                                    <div className="h-px flex-1 bg-slate-700" />
                                    <span>OR</span>
                                    <div className="h-px flex-1 bg-slate-700" />
                                </div>

                                <div>
                                    <label htmlFor="selfDescription" className="mb-2 block text-sm font-medium text-slate-200">
                                        Quick Self-Description
                                    </label>
                                    <textarea
                                        value={selfDescription}
                                        onChange={(e) => setSelfDescription(e.target.value)}
                                        id="selfDescription"
                                        name="selfDescription"
                                        className="h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-500/10"
                                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    />
                                </div>

                                <div className="flex items-start gap-3 rounded-xl border border-sky-500/20 bg-sky-500/10 p-3 text-sm text-sky-200">
                                    <span className="mt-0.5 text-sky-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#0f172a" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#0f172a" strokeWidth="2" /></svg>
                                    </span>
                                    <p>
                                        Either a <strong className="text-white">Resume</strong> or a <strong className="text-white">Self Description</strong> is required to generate a personalized plan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-700 bg-slate-950/40 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                        <span className="text-xs text-slate-400">Interview strategy • Approx 30s</span>
                        <button
                            onClick={handleGenerateReport}
                            disabled={!canGenerateReport}
                            className="flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                            Generate My Interview Strategy
                        </button>
                    </div>
                </div>

                {reports.length > 0 && (
                    <section className="w-full max-w-6xl">
                        <h2 className="mb-3 text-lg font-semibold text-white">My Recent Interview Plans</h2>
                        <ul className="flex flex-wrap gap-3">
                            {reports.map((report) => (
                                <li
                                    key={report._id}
                                    onClick={() => navigate(`/interview/${report._id}`)}
                                    className="group flex min-h-[150px] flex-1 basis-[220px] cursor-pointer flex-col gap-2 rounded-xl border border-slate-700 bg-slate-900 p-4 transition hover:border-pink-500 hover:shadow-lg hover:shadow-pink-900/10"
                                >
                                    <h3 className="text-base font-semibold text-white">{report.title || 'Untitled Position'}</h3>
                                    <p className="text-xs text-slate-400">Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    <p className={`text-sm font-semibold ${report.matchScore >= 80 ? 'text-emerald-400' : report.matchScore >= 60 ? 'text-amber-400' : 'text-rose-400'}`}>
                                        Match Score: {report.matchScore}%
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-400">
                    <a href="#" className="transition hover:text-slate-200">Privacy Policy</a>
                    <a href="#" className="transition hover:text-slate-200">Terms of Service</a>
                    <a href="#" className="transition hover:text-slate-200">Help Center</a>
                </footer>
            </div>
        </div>
    )
}

export default Home