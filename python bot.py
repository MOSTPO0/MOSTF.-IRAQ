import asyncio
import logging
from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton

TOKEN = "7751948851:AAGLNeKJeebBwuccuPMlclUkQa5mUBaC8sc"  # ضع توكن البوت هنا

bot = Bot(token=TOKEN)
dp = Dispatcher(bot)

# إعداد لوحة الأزرار الرئيسية
keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
buttons = [
    "✅ True False استفتاء", "📊 استفتاء MCQ",
    "📝 True False اسئله", "📖 اسئله MCQ",
    "📄 انشاء ملف pdf احترافي", "🌎 ترجمه احترافيه",
    "🖼 استخراج نص الصوره", "📜 استخراج نص الـ pdf",
    "🤖 حل الاسئله", "🧠 GPT-4",
    "📞 الدعم الفني", "📑 عمل تقرير جامعي",
    "🖼➡📄 تحويل الصور إلى ملف PDF"
]
keyboard.add(*[KeyboardButton(text=b) for b in buttons])

# عند الضغط على /start
@dp.message_handler(commands=["start"])
async def send_welcome(message: types.Message):
    text = "✨ مـــرحبا بك في بوت يوسف الجامعي\nاختر ما تريده من الأزرار 🛡"
    await message.answer(text, reply_markup=keyboard)

async def main():
    logging.basicConfig(level=logging.INFO)
    await dp.start_polling()

if __name__ == "__main__":
    asyncio.run(main())
