import OpenAI from "openai";

// ⚠️ 주의: 브라우저에서 OpenAI API 키를 직접 사용하는 것은 보안상 위험할 수 있습니다.
// 프로덕션 환경에서는 백엔드 API를 통해 OpenAI를 호출하는 것을 권장합니다.
export const openaiClient = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY || "API_KEY",
  dangerouslyAllowBrowser: true, // 브라우저 환경에서 실행 허용
});

export default openaiClient;

