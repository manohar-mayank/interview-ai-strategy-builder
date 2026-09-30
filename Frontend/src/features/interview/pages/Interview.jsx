import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useParams } from 'react-router'

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/70">
            <div className="flex cursor-pointer items-start gap-3 p-4" onClick={() => setOpen((value) => !value)}>
                <span className="mt-1 rounded-md border border-pink-500/30 bg-pink-500/10 px-2 py-1 text-[10px] font-bold text-pink-400">
                    Q{index + 1}
                </span>
                <p className="flex-1 text-sm font-medium text-slate-100">{item.question}</p>
                <span className={`mt-1 text-slate-400 transition ${open ? 'rotate-180 text-pink-400' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>

            {open && (
                <div className="space-y-4 border-t border-slate-700 bg-slate-950/50 p-4 text-sm text-slate-300">
                    <div>
                        <span className="mb-2 inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                            Intention
                        </span>
                        <p>{item.intention}</p>
                    </div>
                    <div>
                        <span className="mb-2 inline-block rounded-md border border-sky-500/30 bg-sky-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-300">
                            Model Answer
                        </span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
        <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full border border-pink-500/30 bg-pink-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-pink-400">
                Day {day.day}
            </span>
            <h3 className="text-base font-semibold text-white">{day.focus}</h3>
        </div>

        <ul className="space-y-2 text-sm text-slate-300">
            {day.tasks.map((task, i) => (
                <li key={i} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-pink-500" />
                    <span>{task}</span>
                </li>
            ))}
        </ul>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId, getReportById])

    if (loading || !report) {
        return (
            <main className="grid min-h-screen place-items-center bg-slate-950 text-slate-100">
                <h1 className="text-3xl font-semibold">Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreTone =
        report.matchScore >= 80 ? 'text-emerald-400' :
        report.matchScore >= 60 ? 'text-amber-400' : 'text-rose-400'

    return (
        <div className="min-h-screen bg-slate-950 p-4 text-slate-100 md:p-6">
            <div className="mx-auto flex max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/40 lg:flex-row">
                <nav className="flex w-full flex-row gap-2 overflow-x-auto border-b border-slate-700 bg-slate-950/60 p-4 lg:w-72 lg:flex-col lg:border-b-0 lg:border-r">
                    <p className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 lg:block">Sections</p>
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${activeNav === item.id ? 'bg-pink-500/10 text-pink-400' : 'text-slate-300 hover:bg-slate-800 hover:text-white'}`}
                            onClick={() => setActiveNav(item.id)}
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}

                    <button
                        onClick={() => getResumePdf(interviewId)}
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-pink-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-500"
                    >
                        <svg width="0.8rem" height="0.8rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                        Download Resume
                    </button>
                </nav>

                <main className="flex-1 p-4 md:p-6">
                    {activeNav === 'technical' && (
                        <section>
                            <div className="mb-5 flex items-center gap-3 border-b border-slate-700 pb-4">
                                <h2 className="text-xl font-bold text-white">Technical Questions</h2>
                                <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                                    {report.technicalQuestions.length} questions
                                </span>
                            </div>
                            <div className="space-y-3">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className="mb-5 flex items-center gap-3 border-b border-slate-700 pb-4">
                                <h2 className="text-xl font-bold text-white">Behavioral Questions</h2>
                                <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                                    {report.behavioralQuestions.length} questions
                                </span>
                            </div>
                            <div className="space-y-3">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className="mb-5 flex items-center gap-3 border-b border-slate-700 pb-4">
                                <h2 className="text-xl font-bold text-white">Preparation Road Map</h2>
                                <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                                    {report.preparationPlan.length}-day plan
                                </span>
                            </div>
                            <div className="space-y-4">
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <aside className="w-full border-t border-slate-700 bg-slate-950/50 p-4 lg:w-80 lg:border-l lg:border-t-0">
                    <div className="mb-6 rounded-xl border border-slate-700 bg-slate-900 p-4">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Match Score</p>
                        <div className="flex items-end justify-center gap-1 rounded-2xl bg-slate-800/80 px-4 py-5">
                            <span className={`text-4xl font-bold ${scoreTone}`}>{report.matchScore}</span>
                            <span className="pb-1 text-lg text-slate-400">%</span>
                        </div>
                        <p className="mt-3 text-center text-sm text-slate-300">Strong match for this role</p>
                    </div>

                    <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Skill Gaps</p>
                        <div className="flex flex-wrap gap-2">
                            {report.skillGaps.map((gap, i) => (
                                <span
                                    key={i}
                                    className={`rounded-full border px-2.5 py-1 text-xs font-medium ${
                                        gap.severity === 'high'
                                            ? 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                                            : gap.severity === 'medium'
                                                ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                                                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                                    }`}
                                >
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview