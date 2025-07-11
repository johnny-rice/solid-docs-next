import { Component, Index, Match, Switch, createMemo } from "solid-js";
import { ButtonLink } from "../button-link";
import { snippetLines } from "./hero-code-snippet";
import { useMatch } from "@solidjs/router";
import { useI18n } from "~/i18n/i18n-context";
import RenderedCode from "./hero-code-snippet";

const TrafficLightsIcon: Component<{ class: string }> = (props) => {
	return (
		<svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
			<circle cx="5" cy="5" r="4.5" />
			<circle cx="21" cy="5" r="4.5" />
			<circle cx="37" cy="5" r="4.5" />
		</svg>
	);
};

export const Hero: Component = () => {
	const isStart = useMatch(() => "/solid-start/*");
	const isRouter = useMatch(() => "/solid-router/*");
	const isMeta = useMatch(() => "/solid-meta/*");

	const buttonHref = createMemo(() => {
		if (isStart()) {
			return "solid-start/getting-started";
		}
		if (isRouter()) {
			return "solid-router/getting-started/installation-and-setup";
		}
		if (isMeta()) {
			return "solid-meta/getting-started/installation-and-setup";
		}
		return "/quick-start";
	});

	const i18n = useI18n();

	return (
		<div class="mb-10 overflow-hidden border border-sky-200 bg-sky-100/80 dark:border-none dark:bg-slate-900">
			<div class="py-10 sm:px-2 lg:relative">
				<div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
					<div class="relative md:text-center lg:text-left">
						<div class="relative">
							<h2 class="inline bg-gradient-to-r from-blue-700 via-slate-800 to-blue-700 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-indigo-200 dark:via-blue-400 dark:to-indigo-200">
								<Switch fallback={i18n.t("hero.title")}>
									<Match when={isStart()?.path}>
										Solid<span class="font-thin">Start</span>
									</Match>
									<Match when={isRouter()?.path}>
										<span class="font-thin">Solid </span>Router
									</Match>
									<Match when={isMeta()?.path}>
										<span class="font-thin">Solid-</span>Meta
									</Match>
								</Switch>
							</h2>
							<p class="mt-3 text-2xl tracking-tight dark:text-slate-300">
								<Switch fallback={i18n.t("hero.subtitle")}>
									<Match when={isStart()?.path}>
										{i18n.t("hero.subtitle.start")}
									</Match>
								</Switch>
							</p>
							<div class="mt-8 flex gap-4 md:justify-center lg:justify-start">
								<ButtonLink href={buttonHref()} variant="primary" addLocale>
									{i18n.t("hero.button.primary")}
								</ButtonLink>
								<ButtonLink
									href="https://discord.com/invite/solidjs"
									variant="secondary"
								>
									{i18n.t("hero.button.secondary")}
								</ButtonLink>
							</div>
						</div>
					</div>
					<div class="relative lg:static xl:pl-10">
						<div class="relative">
							<div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 via-blue-500/70 to-blue-300 opacity-10 blur-lg dark:bg-white dark:from-blue-300 dark:via-blue-300/70" />
							<div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-300 via-blue-300/70 to-blue-300 opacity-10" />
							<div class="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-blue-200/10 backdrop-blur">
								<div class="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-blue-300/0 via-blue-300/70 to-blue-300/0" />
								<div class="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-800 to-blue-400/0 dark:via-blue-400" />
								<div class="pl-4 pt-4">
									<TrafficLightsIcon class="h-2.5 w-auto stroke-slate-500/30" />
									<div class="mt-4 flex space-x-2 text-xs">
										<div class="flex h-6 rounded-full border border-blue-400 bg-gradient-to-r from-blue-400/30 via-blue-400 to-blue-400/30 p-px font-semibold text-blue-300 shadow-sm dark:border-none">
											<div class="flex items-center rounded-full bg-slate-800 px-2.5">
												Counter.jsx
											</div>
										</div>
									</div>
									<div class="mt-6 flex items-start px-1 text-sm">
										<div
											aria-hidden="true"
											class="select-none border-r border-slate-300/5 pb-6 pr-4 font-mono text-slate-300"
										>
											<Index each={snippetLines}>
												{(_, index) => (
													<pre>{(index + 1).toString().padStart(2, "0")}</pre>
												)}
											</Index>
										</div>
										<div
											class={`flex overflow-x-auto px-4 min-h-[${
												snippetLines.length + 5
											}em] custom-scrollbar text-white`}
										>
											<RenderedCode />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
