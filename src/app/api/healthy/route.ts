// Verificação simples de funcionamento do servidor (usada pela hospedagem).
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true });
}
