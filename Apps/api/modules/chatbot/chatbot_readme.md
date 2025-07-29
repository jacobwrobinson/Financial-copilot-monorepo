# `chatbot/` – AI API Orchestration

## Overview
This module serves as the central intelligence of the AI-powered financial assistant system. It is responsible for managing prompt orchestration, interpreting user intent, and routing requests to the appropriate AI models or subsystems. This includes both NLP pipelines and external API interactions.

## Goals
- Interpret user inputs and determine the intent.
- Route inputs to the correct modules (e.g., datastream, knowledgebase).
- Aggregate and manage responses.
- Interface with external AI APIs as needed.

## Responsibilities
- Act as the orchestration layer in the backend pipeline.
- Integrate with the knowledgebase for context retrieval.
- Coordinate with validation and output modules.
- Allow for modular AI strategies (LLMs, custom models, etc).

## Planned Structure
- `router.py`: Input routing logic.
- `handlers/`: Functional modules for each type of AI operation.
- `api_clients/`: Wrappers for OpenAI, Anthropic, etc.
- `prompts/`: Templates and logic for constructing structured prompts.

## Implementation Roadmap
- [ ] Define input routing interface.
- [ ] Create base handlers for question-answering, summarization, etc.
- [ ] Connect to knowledgebase module.
- [ ] Add OpenAI API client integration.
- [ ] Unit tests for orchestration logic.

## Notes
This module will evolve alongside the capabilities of the financial analysis engine. Modularity and extensibility are priorities.

