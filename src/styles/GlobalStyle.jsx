// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after { box-sizing: border-box; }

    html, body, #root { 
        height: 100%;     
        background: linear-gradient(#F8FBFF, #FFFFFF);
        color: #0F172A;
    }
    body {
        margin: 0;         /* 기본 여백 제거 */
        padding: 0;
    }

    :root {
        --roadmap-color-primary: #2A5EE4;
        --roadmap-color-primary-hover: #CFE0FF;
        --roadmap-color-tag-bg: #E9F1FF;
        --roadmap-color-background: #F8FBFF;
        --roadmap-color-white: #FFFFFF;
        --roadmap-color-border: #E9F1FF;
        --roadmap-color-text: #0F172A;
        --roadmap-color-text-light: #64748B;
        --roadmap-color-text-muted: rgba(15, 23, 42, 0.55);
        --roadmap-shadow-card: 0 8px 16px rgba(16, 24, 40, 0.06);
        --roadmap-shadow-bar: 0 2px 8px rgba(0, 0, 0, 0.08);
        --roadmap-shadow-bar-hover: 0 4px 12px rgba(0, 0, 0, 0.12);
        --roadmap-radius-md: 12px;
        --roadmap-radius-lg: 16px;
        --roadmap-spacing-xs: 0.5rem;
        --roadmap-spacing-sm: 0.75rem;
        --roadmap-spacing-md: 1rem;
        --roadmap-spacing-lg: 1.5rem;
        --roadmap-spacing-xl: 2rem;
        --roadmap-spacing-2xl: 3rem;
    }

    .roadmap-page {
        min-height: 100vh;
        padding: var(--roadmap-spacing-xl);
        background: var(--roadmap-color-background);
    }

    .roadmap-page__container {
        max-width: 1280px;
        margin: 0 auto;
        width: 100%;
    }

    .roadmap-page__header {
        margin-bottom: var(--roadmap-spacing-2xl);
    }

    .roadmap-page__title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--roadmap-color-text);
        margin-bottom: var(--roadmap-spacing-sm);
    }

    .roadmap-page__sub-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--roadmap-spacing-md);
    }

    .roadmap-page__category-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--roadmap-spacing-xs);
    }

    .tag-chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 16px;
        background: var(--roadmap-color-tag-bg);
        color: var(--roadmap-color-primary);
        font-size: 0.875rem;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .tag-chip:hover {
        background: var(--roadmap-color-primary-hover);
    }

    .tag-chip svg {
        width: 14px;
        height: 14px;
    }

    .year-control {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.75rem;
        border-radius: 12px;
        border: 1px solid var(--roadmap-color-border);
        background: var(--roadmap-color-white);
        box-shadow: var(--roadmap-shadow-card);
    }

    .year-control__icon {
        width: 18px;
        height: 18px;
        color: var(--roadmap-color-primary);
    }

    .year-control__button {
        border: none;
        background: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        color: var(--roadmap-color-text);
    }

    .year-control__button:hover {
        background: rgba(15, 23, 42, 0.08);
    }

    .year-control__value {
        font-weight: 600;
        min-width: 56px;
        text-align: center;
        color: var(--roadmap-color-text);
    }

    .add-button {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px dashed var(--roadmap-color-primary);
        background: transparent;
        color: var(--roadmap-color-primary);
        font-size: 0.875rem;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
    }

    .add-button svg {
        width: 16px;
        height: 16px;
    }

    .add-button:hover {
        background: var(--roadmap-color-tag-bg);
    }

    .add-button--inline {
        margin-top: var(--roadmap-spacing-sm);
    }

    .add-button--block {
        width: 100%;
        justify-content: center;
    }

    .inline-add-form {
        display: flex;
        gap: var(--roadmap-spacing-xs);
        margin-top: var(--roadmap-spacing-sm);
    }

    .inline-add-form__input {
        flex: 1;
        border: 1px solid var(--roadmap-color-border);
        border-radius: 8px;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
    }

    .inline-add-form__input:focus {
        outline: none;
        border-color: var(--roadmap-color-primary);
        box-shadow: 0 0 0 3px rgba(42, 94, 228, 0.15);
    }

    .inline-add-form__actions {
        display: flex;
        gap: 0.5rem;
    }

    .inline-add-form__button {
        border: none;
        border-radius: 8px;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        background: var(--roadmap-color-primary);
        color: var(--roadmap-color-white);
        cursor: pointer;
        transition: opacity 0.2s ease;
    }

    .inline-add-form__button--ghost {
        background: var(--roadmap-color-tag-bg);
        color: var(--roadmap-color-primary);
    }

    .inline-add-form__button:hover {
        opacity: 0.85;
    }

    .roadmap-page__content-wrapper {
        display: flex;
        gap: var(--roadmap-spacing-xl);
    }

    .filter-panel {
        width: 320px;
        flex-shrink: 0;
        background: var(--roadmap-color-white);
        border: 1px solid var(--roadmap-color-border);
        border-radius: var(--roadmap-radius-lg);
        padding: var(--roadmap-spacing-lg);
        box-shadow: var(--roadmap-shadow-card);
        display: flex;
        flex-direction: column;
        gap: var(--roadmap-spacing-lg);
    }

    .filter-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--roadmap-color-text);
    }

    .filter-section {
        display: flex;
        flex-direction: column;
        gap: var(--roadmap-spacing-sm);
    }

    .filter-label {
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--roadmap-color-text);
    }

    .month-range {
        display: flex;
        flex-direction: column;
        gap: var(--roadmap-spacing-sm);
    }

    .month-range__sliders {
        position: relative;
        height: 34px;
    }

    .month-range__track {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 6px;
        border-radius: 999px;
        background: var(--roadmap-color-tag-bg);
        transform: translateY(-50%);
    }

    .month-range__track-fill {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 999px;
        background: var(--roadmap-color-primary);
    }

    .month-slider {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 34px;
        background: none;
        margin: 0;
        -webkit-appearance: none;
        appearance: none;
        pointer-events: none;
    }

    .month-slider:focus {
        outline: none;
    }

    .month-slider::-webkit-slider-runnable-track {
        background: transparent;
    }

    .month-slider::-moz-range-track {
        background: transparent;
    }

    .month-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--roadmap-color-white);
        border: 2px solid var(--roadmap-color-primary);
        box-shadow: 0 0 0 4px rgba(42, 94, 228, 0.15);
        pointer-events: auto;
        cursor: pointer;
    }

    .month-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: var(--roadmap-color-white);
        border: 2px solid var(--roadmap-color-primary);
        box-shadow: 0 0 0 4px rgba(42, 94, 228, 0.15);
        cursor: pointer;
    }

    .month-range__labels {
        display: flex;
        justify-content: space-between;
        font-size: 0.75rem;
        color: var(--roadmap-color-text-light);
    }

    .activity-type-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .activity-type-option {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.55rem 0.8rem;
        border-radius: 12px;
        border: 1px solid transparent;
        background: #f6f8fd;
        cursor: pointer;
        transition: border-color 0.2s ease, background 0.2s ease;
    }

    .activity-type-option:hover {
        border-color: var(--roadmap-color-border);
    }

    .activity-type-option input {
        width: 16px;
        height: 16px;
        accent-color: var(--roadmap-color-primary);
    }

    .activity-type-option__indicator {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        box-shadow: inset 0 0 0 2px rgba(15, 23, 42, 0.08);
    }

    .activity-type-option__label {
        font-size: 0.875rem;
        color: var(--roadmap-color-text);
    }

    .activity-type-option input:checked ~ .activity-type-option__indicator {
        box-shadow: 0 0 0 3px rgba(42, 94, 228, 0.2);
    }

    .activity-type-option input:checked ~ .activity-type-option__label {
        font-weight: 600;
    }

    .importance-description {
        font-size: 0.75rem;
        color: var(--roadmap-color-text-muted);
        line-height: 1.4;
    }

    .important-checkbox {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.85rem;
        color: var(--roadmap-color-text);
    }

    .important-checkbox input {
        width: 16px;
        height: 16px;
        accent-color: var(--roadmap-color-primary);
    }

    .add-activity-card {
        border: 1px solid var(--roadmap-color-border);
        border-radius: var(--roadmap-radius-md);
        padding: var(--roadmap-spacing-md);
        background: var(--roadmap-color-white);
        box-shadow: var(--roadmap-shadow-card);
        display: flex;
        flex-direction: column;
        gap: var(--roadmap-spacing-md);
    }

    .add-activity-card__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .add-activity-card__header h4 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--roadmap-color-text);
    }

    .icon-button {
        border: none;
        background: transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        color: var(--roadmap-color-text-muted);
    }

    .icon-button:hover {
        background: rgba(15, 23, 42, 0.05);
    }

    .add-activity-card__form {
        display: flex;
        flex-direction: column;
        gap: var(--roadmap-spacing-md);
    }

    .add-activity-card__field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .add-activity-card__field--split {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--roadmap-spacing-sm);
    }

    .add-activity-card__label {
        font-size: 0.8125rem;
        font-weight: 600;
        color: var(--roadmap-color-text);
    }

    .add-activity-card__input {
        width: 100%;
        border: 1px solid var(--roadmap-color-border);
        border-radius: 8px;
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        background: var(--roadmap-color-white);
    }

    .add-activity-card__input:focus {
        outline: none;
        border-color: var(--roadmap-color-primary);
        box-shadow: 0 0 0 3px rgba(42, 94, 228, 0.1);
    }

    .add-activity-card__actions {
        display: flex;
        gap: 0.75rem;
    }

    .primary-button,
    .secondary-button {
        flex: 1;
        padding: 0.6rem 0.75rem;
        border-radius: 10px;
        border: none;
        font-weight: 600;
        cursor: pointer;
    }

    .primary-button {
        background: var(--roadmap-color-primary);
        color: var(--roadmap-color-white);
    }

    .primary-button:hover {
        opacity: 0.9;
    }

    .secondary-button {
        background: var(--roadmap-color-tag-bg);
        color: var(--roadmap-color-primary);
    }

    .secondary-button:hover {
        background: var(--roadmap-color-primary-hover);
    }

    .main-content {
        flex: 1;
        min-width: 0;
    }

    .timeline-container {
        background: var(--roadmap-color-white);
        border-radius: var(--roadmap-radius-lg);
        padding: 32px;
        box-shadow: var(--roadmap-shadow-card);
        overflow-x: auto;
        display: flex;
        flex-direction: column;
        gap: 24px;
    }

    .timeline-header {
        display: grid;
        gap: 40px;
        margin-bottom: 12px;
        padding-left: 20px;
        min-width: 700px;
    }

    .month-column {
        text-align: center;
        font-weight: 600;
        color: var(--roadmap-color-text);
        font-size: 0.95rem;
    }

    .timeline-row {
        display: grid;
        gap: 40px;
        align-items: center;
        position: relative;
        min-width: 700px;
    }

    .row-label {
        font-weight: 600;
        color: var(--roadmap-color-text);
        padding-left: 20px;
    }

    .timeline-row__placeholder {
        grid-column: 2 / -1;
        padding: 0.75rem 1rem;
        border-radius: 12px;
        background: rgba(233, 241, 255, 0.5);
        color: var(--roadmap-color-text-light);
        font-size: 0.875rem;
    }

    .timeline-empty {
        padding: 1.25rem 1.5rem;
        border-radius: var(--roadmap-radius-md);
        background: rgba(233, 241, 255, 0.4);
        color: var(--roadmap-color-text-light);
        font-size: 0.9rem;
    }

    .activity-bar-container {
        position: relative;
        min-height: 36px;
    }

    .activity-bar {
        position: relative;
        padding: 10px 16px;
        border-radius: 12px;
        box-shadow: var(--roadmap-shadow-bar);
        font-size: 0.875rem;
        color: var(--roadmap-color-text);
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .activity-bar:hover {
        transform: translateY(-2px);
        box-shadow: var(--roadmap-shadow-bar-hover);
    }

    .activity-bar--matched {
        box-shadow: 0 0 0 3px rgba(42, 94, 228, 0.35);
    }

    .activity-bar__content {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
    }

    .activity-bar__star {
        color: #F8B400;
        font-size: 0.9rem;
    }

    .activity-bar__title {
        white-space: nowrap;
    }

    .tooltip-content {
        position: absolute;
        bottom: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background: var(--roadmap-color-text);
        color: var(--roadmap-color-white);
        padding: 12px 16px;
        border-radius: 10px;
        font-size: 0.8125rem;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.15);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s ease;
        z-index: 10;
        min-width: 200px;
    }

    .activity-bar:hover .tooltip-content {
        opacity: 1;
    }

    .tooltip-content::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border: 6px solid transparent;
        border-top-color: var(--roadmap-color-text);
    }

    .tooltip-title {
        font-weight: 600;
        margin-bottom: 4px;
    }

    .tooltip-meta {
        font-size: 0.75rem;
        opacity: 0.8;
        margin-bottom: 6px;
    }

    .tooltip-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
    }

    .tooltip-tag {
        display: inline-flex;
        align-items: center;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.15);
        padding: 2px 8px;
        font-size: 0.7rem;
    }

    @media (max-width: 1100px) {
        .roadmap-page {
            padding: var(--roadmap-spacing-lg);
        }

        .roadmap-page__content-wrapper {
            flex-direction: column;
        }

        .filter-panel {
            width: 100%;
        }
    }

    @media (max-width: 640px) {
        .roadmap-page__sub-header {
            flex-direction: column;
            align-items: flex-start;
        }

        .add-activity-card__field--split {
            grid-template-columns: 1fr;
        }

        .month-range__sliders {
            height: 40px;
        }
    }
`;
export default GlobalStyle;